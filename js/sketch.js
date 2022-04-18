//---------------------------------------//
//           ___           ___           //
//          /\__\         /\  \          //
//         /:/ _/_       |::\  \         //
//        /:/ /\  \      |:|:\  \        //
//       /:/ /::\  \   __|:|\:\  \       //
//      /:/_/:/\:\__\ /::::|_\:\__\      //
//      \:\/:/ /:/  / \:\~~\  \/__/      //
//       \::/ /:/  /   \:\  \            //
//        \/_/:/  /     \:\  \           //
//          /:/  /       \:\__\          //
//          \/__/         \/__/          //
//                                       //
//           ~ Flappy Brick? ~           //
//             Apr. 15, 2022             //
//                                       //
//           Surya Manikhandan           //
//    Aerospace Eng. Student @ Purdue    //
//                                       //
//        [E]:smanikha@purdue.edu        //
//  [In]:linkedin.com/in/aerospacesurya  //
//      [Git]: github.com/realsurya      //
//---------------------------------------//

let brick;
let pipes = [];
let fps = 60;
let passing = 0;
let score = 0;

let frames = 0;
let playing = 0;

let fontPx = 1;
let fontRate = 1;
let fontCap = 50;
let fontFamily = 'consolas';

let pipeInterval = 150;
let pipeDecel = .01;
let disapearRate = 2;

function setup()
{

    createCanvas(400, 600);
    frameRate(fps);
    
    background(0,0,0);

    brick = new Player();
    pipes.push(new Pipe());

    push();
    textAlign(CENTER);
    textSize(fontCap);
    fill(255,255,255);
    textFont(fontFamily);
    text('FlappyBrick', width / 2, fontCap);

    textSize(.25* fontCap);
    text('A totally original game by Surya M.', width / 2, fontCap + (.5* fontCap));
    text('Press Enter to begin and to fly the brick.', width / 2, height /2);
    text('Keep flying through as many pipes as you can!', width / 2, (height /2) + (.35* fontCap));

    pop();
}

function draw()
{

    if(playing)
    {
        frames += 1;
        background(0,0,0);

        if (((frames % pipeInterval) == 0) && brick.alive)
        {
            pipes.push(new Pipe());
        }

        passingNow = brick.passing(pipes[0]);
        if((passing == 1) && (passingNow == 0) && brick.alive)
        {
            score +=1;
        }
        passing = passingNow;

        for(var i = pipes.length - 1; i >= 0; i--)
        {
            pipes[i].make();
            pipes[i].update();

            if(brick.alive)
            {
                if(brick.clashing(pipes[i]))
                {
                    brick.alive = 0;
                }
            }else
            {
                for(var j = pipes.length - 1; j >= 0; j--)
                {
                    if(pipes[j].vel >= 0)
                    {
                        pipes[j].vel -= pipeDecel;
                    }else
                    {
                        pipes[j].vel = 0;
                    }
                    if(pipes[j].filler >= 0)
                    {
                        pipes[j].filler -= disapearRate;
                    }else
                    {
                        pipes[j].filler = 0;
                    }
                }
            }

            if (pipes[0].xpos <  (-1 * pipes[0].depth))
            {
                pipes.splice(0,1);
            }
        }

        push();
        textAlign(CENTER);
        textSize(fontCap);
        fill(255,255,255);
        textFont(fontFamily);
        text(score, width / 2, fontCap);
        pop();

        if(!brick.alive)
        {
            drawingContext.filter = 'blur(0px)';
            push();
            textAlign(CENTER);
            textSize(fontPx);
            fill(255,255,255);
            textFont(fontFamily);
            text('Game Over', width / 2, height / 2);
            pop();
            drawingContext.filter = 'blur(3px)';

            if(fontPx < fontCap)
            {
                fontPx += fontRate;
            }else
            {
                fontPx = fontCap;
            }

            if (brick.filler >= 0)
            {
                brick.filler -= disapearRate;
            }else
            {
                brick.filler = 0;
            }
        }

        brick.appear();
        brick.update();
    }

}

function keyPressed()
{

    if(keyCode == RETURN)
    {
        if(!playing)
        {
            playing = 1
        }else
        {
            if(brick.alive)
            {
                brick.flap();
            }
        }
    }

}