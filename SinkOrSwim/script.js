$(function () {
    
    
    // function playAudio() {
    //     var snd = document.getElementById("myAudio");
    //     snd.play(url());
    
    // };
    // playAudio();
    
    
 

    
    function sound(src="bubble.mp3") {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "loop";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
    
    

    // var
    var container = $('#container');
    var fish = $('#fish');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    //initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var fish_left = parseInt(fish.css('left'));
    var fish_height = parseInt(fish.height());
    var speed = 10;
    
    
    var go_up = false;
    var score_updated = false;
    var game_over = false;
    // rank"[]"=

    var the_game = setInterval(function () {

        if (collision(fish, pole_1) || collision(fish, pole_2) || parseInt(fish.css('top')) <= 0 || parseInt(fish.css('top')) > container_height - fish_height) {

            stop_the_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));

            //過關分數增加
            if (pole_current_position > container_width - fish_left) {
                if (score_updated === false) {
                   
                    score.text(parseInt(score.text()) + 10);
                    score_updated = true;
                }
            }

            //障礙物重置
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

                //改變障礙物位置
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                //速度改變
                speed = speed +2;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

            //推進障礙物
            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 30);
    
   
    

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 38 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 38) {
            clearInterval(go_up);
            go_up = false;
        }
    });
    
   

    function go_down() {
        fish.css('top', parseInt(fish.css('top')) + 5);
    }

    function up() {
        fish.css('top', parseInt(fish.css('top')) - 10);
    }

    function pauseAudio()
    {    var snd = document.getElementById("myAudio"); 
         snd.pause(); 
    }
    

    function stop_the_game() {
        clearInterval(the_game);
        pauseAudio();
        game_over = true;
        alert("\n          ><<<(☉>﹉﹉            金魚死翹翹了QQ "    );
        // alert("\n          金魚死掉了啦QQ    \n\n          最高分紀錄"+
        restart_btn.fadeIn();
        
    }
    
    // console.log(myAudio)
   
    
    restart_btn.click(function () {
        location.reload();
    });
    
 

  

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});

 
