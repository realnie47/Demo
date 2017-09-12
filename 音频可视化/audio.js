window.onload = function() {
    visual();
}



function visual() {
        var audioContext;
        var analyser;
        var mic;

        navigator.getMedia = ( 
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
 
        navigator.getMedia ( 
            { audio: true }, 
            function (stream) {
                audioContext = new (window.AudioContext || window.webkitAudioContext);
                mic = audioContext.createMediaStreamSource(stream);
                analyser= audioContext.createAnalyser();
                analyser.fftSize = 256;
                mic.connect(analyser);
                drawIt(); 
            },
            function(){});
             
        var canvas = document.getElementById('canvas');
        var canvasCtx = canvas.getContext('2d');
    
        //音频可视化
        function drawIt() {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            var bufferLength;
            var dataArray;
            var draw;
            bufferLength = analyser.frequencyBinCount
            dataArray = new Uint8Array(bufferLength)
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
            draw = function () {
                window.requestAnimationFrame(draw)
                analyser.getByteFrequencyData(dataArray)
                canvasCtx.fillStyle = 'rgb(0, 0, 0)'
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
                var barWidth = (WIDTH / bufferLength) * 2.5
                var barHeight
                var x = 0
                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i]/2;
                    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
                    canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight)
                    x += barWidth + 1
                }
            }
            draw();
        }
}