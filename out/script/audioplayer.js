        function prefetch_all(suffix) {
            prefetch_img();
        }
        
        function prefetch_img() {
            var imgPlay = new Image();
            var imgPause = new Image();
            var imgStop = new Image();
            var imgRewind = new Image();
            
            imgPlay.src="style/img/play.svg";
            imgPause.src="style/img/pause.svg";
            imgStop.src="style/img/stop.svg";
            imgRewind.src="style/img/rewind.svg";
        }
        
        function audio_play(evt, elemId) {
            document.getElementById(elemId).play(); 
            evt.stopPropagation();
        }

        function audio_playpause(evt, elemId) {
            var audio = document.getElementById("audio_" + elemId);
            var button = document.getElementById("btn_playpause_" + elemId);
            
            if (audio.paused) {
                audio.play();
                button.className = "audio_pause";
                
                audio.onended = function() {
                    button.className = "audio_play";
                };
            } else {
                audio.pause();
                button.className = "audio_play";
            }
            
            evt.stopPropagation();
        }

        function audio_rewind(evt, elemId) {
            var audio = document.getElementById("audio_" + elemId);
            
            if (audio.paused) {
                audio_playpause(evt, elemId);
            }
            
            audio.currentTime = 0;
            
            evt.stopPropagation();
        }

        function audio_init(evt, elemId){
            document.getElementById("overlay_" + elemId).style.display = "block";
            audio_playpause(evt, elemId);
        }

        function audio_stop(evt, elemId) {
            document.getElementById("overlay_" + elemId).style.display = "none";
            document.getElementById("audio_" + elemId).pause();
            document.getElementById("audio_" + elemId).currentTime = 0;
            evt.stopPropagation();
        }
