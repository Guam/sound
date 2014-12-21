pc.script.create('sequencer', function (context) {
    // Creates a new Sequencer instance
    var Sequencer = function (entity) {
        this.entity = entity;
        
        this.audioContext = null;   //https://github.com/cwilso/metronome/
        this.isPlaying = false;      // Are we currently playing?
        this.startTime;              // The start time of the entire sequence.
        this.current16thNote;        // What note is currently last scheduled?
        this.tempo = 120.0;          // tempo (in beats per minute)
        this.lookahead = 25.0;       // How frequently to call scheduling function 
                                    //(in milliseconds)
        this.scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                                    // This is calculated from lookahead, and overlaps 
                                    // with next interval (in case the timer is late)
        this.nextNoteTime = 0.0;     // when the next note is due.
        this.noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
        this.noteLength = 0.05;      // length of "beep" (in seconds)
        this.canvas;                 // the canvas element
        this.canvasContext;          // canvasContext is the canvas' context 2D
        this.last16thNoteDrawn = -1; // the last "box" we drew on the screen
        this.notesInQueue = [];      // the notes that have been put into the web audio,
                                    // and may or may not have played yet. {note, time}
        this.worker = null;     // The Web Worker used to fire timer messages
        
        
        
    };

    Sequencer.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            alert(this.entity.script);
            this.worker = new Worker('https://raw.githubusercontent.com/Guam/sound/master/worker.js');
            this.worker.onmessage = function(e) {
                if (e.data == "tick") {
                    alert(e.data);
                    console.log("tick!");
                    this.scheduler();
                }
                else{
                    alert(e.data);
                }
            };
            console.log(this.worker);
            //this.worker.postMessage('start'); // Start the worker.
            
            
            
            
            //this.canvas = this.canvasWidth = document.getElementsByTagName ('canvas')[0];
            //this.canvasContext = canvas.getContext( '2d' );
            //this.canvas.width = window.innerWidth; 
            //this.canvas.height = window.innerHeight; 
      
        
            // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
            // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
            // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
            // spec-compliant, and work on Chrome, Safari and Firefox.
        
            //this.audioContext = new AudioContext();
        
            
            
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        start: function(){
            this.worker.postMessage('start');
        },
        
        scheduler: function(){
            // while there are notes that will need to play before the next interval, 
            // schedule them and advance the pointer.
            while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
                this.scheduleNote( this.current16thNote, this.nextNoteTime );
                this.nextNote();
            }
        },
        
        nextNote: function(){
            // Advance current note and time by a 16th note...
            var secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT 
                                                  // tempo value to calculate beat length.
            this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
        
            this.current16thNote++;    // Advance the beat number, wrap to zero
            if (this.current16thNote == 16) {
                this.current16thNote = 0;
            }
        },
        
        scheduleNote: function(beatNumber,time){
            
            // push the note on the queue, even if we're not playing.
            this.notesInQueue.push( { note: beatNumber, time: time } );
        
            if ( (this.noteResolution==1) && (beatNumber%2))
                return; // we're not playing non-8th 16th notes
            if ( (this.noteResolution==2) && (beatNumber%4))
                return; // we're not playing non-quarter 8th notes
        
            // create an oscillator
            var osc = this.audioContext.createOscillator();
            osc.connect( this.audioContext.destination );
            if (beatNumber % 16 === 0)    // beat 0 == low pitch
                osc.frequency.value = 880.0;
            else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
                osc.frequency.value = 440.0;
            else                        // other 16th notes = high pitch
                osc.frequency.value = 220.0;
        
            osc.start( time );
            osc.stop( time + noteLength );
            
        }
        
        
    };

    return Sequencer;
});
