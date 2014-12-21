var content = {"application_properties":{"libraries":[],"width":1280,"fill_mode":"FILL_WINDOW","height":720,"resolution_mode":"AUTO"},"toc":{"c504854a-871c-11e4-964b-12313b0a5ec6":{"assets":{},"packs":["c504854a-871c-11e4-964b-12313b0a5ec6"]}},"packs":{"c504854a-871c-11e4-964b-12313b0a5ec6":{"name":"Game","resource_id":"c504854a-871c-11e4-964b-12313b0a5ec6","settings":{"physics":{"gravity":[0.0,-9.8,0.0]},"render":{"fog_end":1000.0,"fog_start":1.0,"shadow_distance":40.0,"global_ambient":[0.2,0.2,0.2],"tonemapping":0,"fog_color":[0.0,0.0,0.0],"fog":"none","skybox":null,"fog_density":0.01,"gamma_correction":true,"exposure":1.0}},"hierarchy":{"scale":[1,1,1],"name":"Game","parent":null,"resource_id":"c504854a-871c-11e4-964b-12313b0a5ec6","labels":[],"enabled":true,"components":{"pack":{}},"position":[0,0,0],"rotation":[0,0,0],"children":[{"scale":[1,1,1],"name":"Camera","parent":"c504854a-871c-11e4-964b-12313b0a5ec6","resource_id":"c5048824-871c-11e4-964b-12313b0a5ec6","labels":[],"enabled":true,"components":{"camera":{"priority":0.0,"fov":45.0,"clearDepthBuffer":true,"projection":0.0,"clearColor":[0.73,0.73,0.69,1.0],"enabled":true,"orthoHeight":100.0,"farClip":1000.0,"nearClip":0.3,"rect":[0.0,0.0,1.0,1.0],"clearColorBuffer":true}},"position":[0,0,5],"rotation":[0,0,0],"children":[],"template":null},{"scale":[1,1,1],"name":"SndMaker","parent":"c504854a-871c-11e4-964b-12313b0a5ec6","resource_id":"791e0bd7-9818-4670-bbc2-d6ba07a46bb6","labels":[],"enabled":true,"components":{"script":{"enabled":true,"scripts":[{"url":"makeSounds.js","attributes":[],"name":"makeSounds"}]}},"position":[0,0,0],"rotation":[0,0,0],"children":[],"template":null},{"scale":[1,1,1],"name":"Sound","parent":"c504854a-871c-11e4-964b-12313b0a5ec6","resource_id":"1446e97e-e23c-455c-86f6-8eef03526259","labels":[],"enabled":true,"components":{"script":{"enabled":true,"scripts":[{"url":"AudioContextMonkeyPatch.js","attributes":[],"name":"AudioContextMonkeyPatch"},{"url":"egonelbre.com/lib/jsfx/audio.js","name":""},{"url":"egonelbre.com/lib/jsfx/jsfx.js","name":""},{"url":"egonelbre.com/lib/jsfx/jsfxlib.js","name":""},{"url":"mgr.js","attributes":[],"name":"mgr"},{"url":"worker.js","attributes":[],"name":"worker"},{"url":"sequencer.js","attributes":[],"name":"sequencer"}]}},"position":[0,0,0],"rotation":[0,0,0],"children":[],"template":null},{"scale":[1,1,1],"name":"DirectionalLight","parent":"c504854a-871c-11e4-964b-12313b0a5ec6","resource_id":"c5048ac2-871c-11e4-964b-12313b0a5ec6","labels":[],"enabled":true,"components":{"light":{"color":[1.0,1.0,1.0],"falloffMode":0.0,"shadowResolution":1024.0,"outerConeAngle":45.0,"enabled":true,"range":10.0,"castShadows":false,"intensity":1.0,"innerConeAngle":40.0,"shadowBias":0.05,"type":"directional"}},"position":[0,10,0],"rotation":[45,45,0],"children":[],"template":null}],"template":null}}}};
pc.content = new pc.fw.ContentFile(content);