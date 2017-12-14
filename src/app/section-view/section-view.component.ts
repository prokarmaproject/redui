import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.css']
})
export class SectionViewComponent implements OnInit{

  data : any;
  surveyQuestions:any;
  sectionArray:any;
  currentSurvey:any;

  constructor( public dataService:DataService) {
   
  }

  submitSurvey(){
    this.dataService.getSurveyData(this.dataService.getCurrentSurveyId()).subscribe(response => {
      this.currentSurvey = response[0];
      this.ProcessSections(this.data);
      
    });
    
    
    // this.dataService.updateSurveyQuestions(this.data).subscribe(response => {

    // });
  }
  
sortSections(order:any){
  if(order=="ascending"){
    this.data = new SortPipe().transform(this.data,'sectionName',false);
  }else if(order=="decending"){
    this.data = new SortPipe().transform(this.data,'sectionName',true);
  }else if(order="date"){

  }else{
    return this.data;
  }
}

  ProcessSections(data:any) {
    var sectionOptions = ["Section 1","Section2"];    
    var sections = [];
    data.forEach(function(sec){
      if(sections.indexOf(sec.sectionName) < 0){
        sections.push(sec.sectionName);        
      }
    });
    sections.sort();
    sections.forEach(section => {
      var eachSectionQuestions = [];      
      data.forEach(question => {
        let answerText ="";
        if(question.questionType == 7){
          question.answer.answerText = null;
          question.answers.forEach(function(ans){
            answerText = answerText+":"+ ans.answerText;
          });
        }
        if(question.questionType == 8){
          var columns = question.subQuestions[0].rows[0].columns;
        } 
        
        if(section == question.sectionName){
          let eachQuestion = {
            QuestionName: question.questionName,
            QuestionType : question.questionType,
            Answer:{
              AnswerText:question.answer.answerText? question.answer.answerText:answerText,
              AnswerOptionsText:question.answer.answerOptionsText.join(":")
            },
            SubQuestions : question.subQuestions, 
            Columns : columns,
            IsMainQuestion:true,
            ParentQuestion:null
          }
          eachSectionQuestions.push(eachQuestion);
        }
      });
      var obj = {
        "SectionName" : section,
        "SubSections": [],
        "Questions": eachSectionQuestions,
        "ParentSectionId":null,
        "SurveyId": this.currentSurvey.surveyId
      }
      this.sectionArray.push(obj);
    });
    this.surveyQuestions = {
      "SurveyId": this.currentSurvey.surveyId,
      "Title":this.currentSurvey.title,
      "Version":this.currentSurvey.version,
      "PackageLocked":this.currentSurvey.packageLocked,
      "sections": this.sectionArray
    }
    console.log(JSON.stringify(this.surveyQuestions));
  }

  deleteTheRow(inputType:any, index:any){
    inputType.subQuestions.splice(index,1);
  }

  addRow(inputType:any){
    var row = {
      columns : []
    }
    let Column = {
      columnName : "Column 1",
      columnType : "label",
      columnValue : "Type Sub question",
      columnOptions : []
    };
    let columns = [];
    columns.push(Column);
    if(inputType.Columns.length >0){
      var dummyCols = JSON.parse(JSON.stringify(inputType.Columns));
      var remainingColumns = dummyCols.splice(1);
      remainingColumns.forEach(function(column){
        let rowColumn = {
          columnName : column.columnName,
          columnType : column.columnType,
          columnValue : "",
          columnOptions : []
        };
        columns.push(rowColumn);
      });
    }
    row.columns = columns; 
    let Subquestion = {
      rows : []
    }
    Subquestion.rows.push(row);
    inputType.subQuestions.push(Subquestion);
    console.log(JSON.stringify(inputType.subQuestions));
  }

  ngOnInit() {
    var id = this.dataService.getCurrentSurveyId();
    console.log(id);
    this.dataService.getSurveyQuestions(id).subscribe(response => {
      this.data = response;
      this.data.forEach(function(section){
        section.questions.forEach(function(question){
          var answers =[];
          if(question.questionType == 7){
            question.answer.answerText.split(":").forEach(function(a){
              var ans:any ={};
              ans.AnswerText = a;
              answers.push(ans);              
            });
            answers.shift();
          }
          var Columns = [];
          if(question.questionType == 4 || question.questionType == 8){
            Columns= question.subQuestions[0].rows[0].columns;            
            question.Columns = Columns;
          }
          question.answers = answers;
        });
      });    
     });
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy', pure: false})

export class SortPipe {

  transform(array: Array<Object>, args: string, reverse: boolean = false): Array<Object> {

    console.log("calling pipe");

    if (array == null) {
      return null;
    }
    const m = reverse ? -1 : 1;
    array.sort((a: any, b: any): number => {
      const x = a[args]
      const y = b[args]
      return (x === y) ? 0 : (x < y) ? -1*m : 1*m
    });
    return array;
  }
}
