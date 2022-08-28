import { Subscription } from 'rxjs';
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Task } from '../Task';
import { UiService } from '../services/ui.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  text!:string;
  day!:string;
  reminder:boolean= false;
  subscription:Subscription | undefined;
  showAddTask:boolean= false;

  @Output() onAddTask : EventEmitter<Task> = new EventEmitter();

  constructor(private uiService:UiService ) { 
    this.subscription = this.uiService.onToggle().subscribe(value=>{
      this.showAddTask = value;
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert('Please add task!');
      return;
    }
    const newTask ={
      text: this.text,
      day: this.day,
      reminder:this.reminder
    }
    this.onAddTask.emit(newTask);
    this.text='';
    this.day='';
    this.reminder = false;

  }

}
