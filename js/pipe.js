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

function Pipe()
{
    
    this.depth = 40;
    this.gap = 100;
    this.buffer = 50;
    this.filler = 255;
    
    this.boty = random(this.buffer + this.gap, height - this.buffer)
    this.xpos = width  

    this.vel = 2;

    this.make = function()
    {
        push();
        fill(this.filler,this.filler,this.filler);
        noStroke();
        rect(this.xpos, this.boty, this.depth, (height - this.boty + 1));
        rect(this.xpos, -1, this.depth, this.boty - this.gap);
        pop();
    }

    this.update = function()
    {
        this.xpos -= this.vel;
    }

}