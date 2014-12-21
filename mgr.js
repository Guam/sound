pc.script.create('mgr', function (context) {
    // Creates a new Mgr instance
    var Mgr = function (entity) {
        this.entity = entity;
        this.drums = [];
        
    };

    Mgr.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
           
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        calcFreq: function (semi, base){
            return 220*Math.pow(2, base/12)*Math.pow(2, semi/12);
        },
        
        addDrums: function (octave, size, radius){
            
            // Math function aliases
            var sgn=function(val) { return val >= 0 ? 1 : -1 },
                W=1000,
                H=800;
                
                
                letters = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F' ];
                semis=[0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
                
                baseSound = ["sine",0.0000,0.4130,0.0370,0.5500,2.2320,0.0420,135.0000,663.0000,2000.0000,0.0000,0.0000,0.0020,7.7844,0.0003,0.0000,0.0000,0.1000,0.0000,-0.0200,0.0016,0.0020,-0.0060,1.0000,-0.0060,0.0000,0.0000,0.0000];
    
            
            
            for(var i = 12; i--;){
                var alpha = i * 2*Math.PI / 12 - 2*Math.PI/4,
                    drum = {
                        loc    : [W/2 + Math.cos(alpha)*radius, H/2 - Math.sin(alpha)*radius],
                        radius : size,
                        radius2 : size * size,
                        name   : letters[i],
                        hot    : 1.0,
                        semi   : semis[i],
                        freq   : this.calcFreq(semis[i], 4) * Math.pow(2,octave)
                    };
                this.drums.push(drum);
            }
        },
        
        playSound: function ( drum, alpha, dist ){
            drum.hot = 1.0;
        
            alpha = 1 - Math.abs(alpha)/2*Math.PI;
        
            var params = jsfxlib.arrayToParams(baseSound);
            
            var distf = 1-Math.sqrt( dist / drum.radius2 );
            
            params.MasterVolume = 0.2 * Math.sqrt(distf) + 0.1;
            params.StartFrequency = drum.freq + drum.freq * Math.random() * 0.001;  
            params.SustainTime = 0.1 * distf + 0.01;
            params.DecayTime = 0.5 * distf + 0.01;
            
            //params.VibratoDepth = 0.01;
            //params.VibratoFrequency = 7*(1-distf);
            
            var data = jsfx.generate(params),
                wave = audio.make(data);
            delete data;
            wave.play();
            wave.addEventListener("ended", function(){ delete wave; }); // protect from gc
        }
        
    };

    return Mgr;
});