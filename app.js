document.addEventListener('DOMContentLoaded',()=>{
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')

    let isJumping = false
    let gravity =0.9
    let isGameOver =false
    
    function control(e){
        if(e.keyCode ===32){
            if(!isJumping){
                isJumping=true
                jump()
            }
        }
    }

    document.addEventListener('keyup', control)
 
    let position=0
    function jump() {
        let count=0
        let timerId= setInterval(function(){

        //move down
        if(count===15){
            clearInterval(timerId)
            console.log('down')
            let downTimerId = setInterval(function(){
                if (count===0){
                    clearInterval(downTimerId)
                    isJumping = false
                }
                position -= 5
                count--
                position=position*gravity
                dino.style.bottom= position + 'px'
            },20)
            
        }    
 

        //move up
        console.log('up')
        position +=30
        count++
        position = position * gravity
        dino.style.bottom = position + 'px'
        console.log(dino.style.bottom)    
        },20 )
    }


    function genObstacles(){
        let randomTime = Math.random()*2000
        let obstaclePosition = 500;
        const obstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left= obstaclePosition + 'px'


        let timerId =setInterval(function(){
            if(obstaclePosition>0 && obstaclePosition <60 && position<60){
                 clearInterval(timerId)
                 alert.innerHTML='Game Over!'
                 isGameOver=true
                 body.removeChild(body.firstChild)
                 while (grid.firstChild) {
                   grid.removeChild(grid.lastChild)
                 
                 }
            }

                obstaclePosition -=10;
                obstacle.style.left = obstaclePosition + 'px'
        },20)  
        
        //isGameOver variable has to be false execute the following code
        //if there is not a game over we can execute the setTimeout 
            if(!isGameOver) setTimeout(genObstacles,randomTime)
        
         
    }
    genObstacles()

})