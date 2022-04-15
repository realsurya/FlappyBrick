function Player(){
    this.side = 25;
    this.xpos = 50;
    this.ypos = (height / 2) - (this.side / 2);

    this.g = .25;
    this.vel = 0; 
    this.impulse = 5;

    this.vlimiter = 15;
    this.angLim = 45;
    this.angle = 0;
    this.alive = 1;

    this.filler = 255;

    this.appear = function(){
        fill(this.filler,this.filler,this.filler);

        push();
        noStroke();
        square(this.xpos, this.ypos, this.side);
        pop();
        
    }

    this.update = function(){
        this.vel += this.g;
        this.ypos += this.vel;
        this.angle = map(this.vel, -1*this.vlimiter, this.vlimiter, -1*this.angLim, this.angLim);
    
        if(this.ypos > (height - this.side)){
            this.ypos = (height - this.side);
            this.vel = 0;
            this.alive = 0;
        }

        if(this.ypos < 0){
            this.ypos = 0;
            this.vel = 0;
            this.alive = 0;
        }

        if(this.vel > this.vlimiter){
            this.vel = this.vlimiter;
        }else if(this.vel < (-1*this.vlimiter)){
            this.vel = -1* this.vlimiter;
        }
        //console.log(this.vel)
    }

    this.flap = function(){
        if(this.alive){
            this.vel -= this.impulse;
        }else{
            this.vel = 0;
        }
    }

    this.clashing = function(pipe){
        if((pipe.xpos < (this.xpos + this.side)) && ((this.xpos) < (pipe.xpos + pipe.depth))){
            if(((this.ypos + this.side) > pipe.boty) | (this.ypos < (pipe.boty - pipe.gap))){
                return true;
            }
        }
        return false;
    }

    this.passing = function(pipe){
        if((pipe.xpos < (this.xpos + this.side)) && ((this.xpos) < (pipe.xpos + pipe.depth))){
            if(!this.clashing(pipe)){
                return true;
            }
        }
        return false;
    }

}