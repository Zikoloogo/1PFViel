import { Component } from '@angular/core';

@Component({
  selector: 'app-robot',
  standalone: false,
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss'
})
export class RobotComponent {
owner: string = 'Leon';
batery: number = 100
functions : string[]= ['wifi','sound','camera','light']
constructor(){

}
  
move(){
  if (this.batery > 0) {
    this.batery -= 10;
  } else {
    this.bateryError()
  }
}

charge() {
  if (this.batery < 100){
    this.batery += 10;
  } else {
    this.bateryError();
  }
}

bateryError(){
  console.error('battery empty')
}
}
