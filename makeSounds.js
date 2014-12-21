


pc.script.create('makeSounds', function (context) {
    // Creates a new MakeSounds instance
    var MakeSounds = function (entity) {
        this.entity = entity;
        this.sndMgr;
        this.sequencer;

    };

    MakeSounds.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.sndMgr = context.root.findByName("Sound").script.mgr;
            
            this.sndMgr.addDrums(0,60,250);
            
            this.sndMgr.playSound(this.sndMgr.drums[1],1,1);
            this.sndMgr.playSound(this.sndMgr.drums[4],1,1);
            
            //this.sequencer = context.root.findByName("Sound").script.sequencer;
            //this.sequencer.start();
            
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
        
    };

    return MakeSounds;
});