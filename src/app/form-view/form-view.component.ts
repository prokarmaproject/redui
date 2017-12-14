import { Component, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import {DataService} from "../data.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";
import { DialogService } from "ng2-bootstrap-modal";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Section } from '../send-to-api/Models/Section';
import { Question } from '../send-to-api/Models/Question';
import { Answer } from '../send-to-api/Models/Answer';
import { QuestionType } from '../send-to-api/Models/QuestionType';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css'],
})
export class FormViewComponent implements OnInit {
  public showQueBox:any;
  public ques:Array<any> = [];
  returnedJsonFromUi: Array<any>;
  sectionArray: Array<any> = [];
  surveyQuestions:any;
  subQuestions: Array<Question>;
  public currentSurvey:any;
  public textDecorator:any="";
  public sectionOptions:Array<any> = ["Section 1","Section 2","Section 3","Section 4"];
  private apiUrl: string = "http://localhost:55761/api/section/";
  public tools:Array<any> = [
    {
      "QuestionName":"Write your question for label",
      "QuestionType":6,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "SubQuestions":[],
      "SectionName":"Section 1",
      "Class":"bold-text"
    },
    {
      "QuestionName":"write your question for Question format",
      "QuestionType": 7,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "Answers":[
        
      ],
      "SectionName":"Section 1",
      "Class":""
    },
    {
      "QuestionName":"Write your question for text",
      "QuestionType":0,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "SectionName":"Section 1",
      "Class":""
    },
    {
      "QuestionName":"Write your question for radio button",
      "QuestionType":3,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":["True","False"]
      },
      "dummyOptions":[{},{}],
      "SectionName":"Section 1",
      "Class":""
    },
    {
      "QuestionName":"Write your question for checkbox",
      "QuestionType":1,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":["Option1","Option2"]
      },
      "dummyOptions":[{},{}],
      "SectionName":"Section 1",
      "Class":""
    },
    {
      "QuestionName":"Write your question for Table",
      "QuestionType":4,
      "SubQuestions":[
      ],
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "SectionName":"Section 1",
      "Columns":[
        {
        "ColumnName": "Column 1",
        "ColumnType":"label"}
        ],
      "Class":""
    },
    {
      "QuestionName":"Write your question for Table",
      "QuestionType":8,
      "SubQuestions":[
      ],
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "SectionName":"Section 1",
      "Columns":[
        {
        "ColumnName": "Column 1",
        "ColumnType":"label"}
        ],
      "Class":""
    },
    {
      "QuestionName":"write your question for Date",
      "QuestionType": 5,
      "Answer":{
        "AnswerText":"",
        "AnswerOptionsText":[]
      },
      "SectionName":"Section 1",
      "Class":""
    }
    
  ];
  public packages:any = [];
  public openChildren:boolean;
  public newPackage:any;
  public openForm:boolean;
  public updateButton:boolean;
  public openTree:boolean;
  public dataStorage:any;
  public startFlag:any;

  clicked(i,flag){
    this.showQueBox[i] = !flag;
  }
  deleteElement(index){
    this.ques.splice(index, 1);
  }

  addRowForLabel(inputType:any, type:any){
    var row = {
      Columns : []
    }
    let Columns = [
      {
      ColumnName : "Column 1",
      ColumnType : "label",
      ColumnValue : "Type Sub question",
      ColumnOptions : []
      },
      {
        ColumnName : "Column 2",
        ColumnType : type,
        ColumnValue : "Type Sub question",
        ColumnOptions : []
      }
    ];
    row.Columns = Columns; 
    let Subquestion = {
      Rows : []
    }
    Subquestion.Rows.push(row);
    inputType.SubQuestions.push(Subquestion);
    console.log(JSON.stringify(inputType.SubQuestions));
  }

  addRow(inputType:any){
    var row = {
      Columns : []
    }
    let Column = {
      //SubQuestionColumnId:1,
      ColumnName : "Column 1",
      ColumnType : "label",
      ColumnValue : "Type Sub question",
      ColumnOptions : []
    };
    let columns = [];
    columns.push(Column);
    var dummyCols = JSON.parse(JSON.stringify(inputType.Columns));
    var remainingColumns = dummyCols.splice(1);
    remainingColumns.forEach(function(column){
      let rowColumn = {
        //SubQuestionColumnId:column.SubQuestionColumnId+1,
        ColumnName : column.ColumnName,
        ColumnType : column.ColumnType,
        ColumnValue : "",
        ColumnOptions : []
      };
      columns.push(rowColumn);
    });
    row.Columns = columns; 

    let Subquestion = {
      Rows : []
    }
    Subquestion.Rows.push(row);
    inputType.SubQuestions.push(Subquestion);
    console.log(JSON.stringify(inputType.SubQuestions));
  }

  addColumn(inputType:any, columnType:string){
    let column = {
      "ColumnName": "Column "+(inputType.Columns.length+1),
      "ColumnType":columnType,
    };
    if(inputType.SubQuestions.length > 0){
      inputType.SubQuestions.forEach(function(question) {
        let rowColumn ={
          //SubQuestionColumnId:inputType.Columns.length+1,          
          ColumnName : column.ColumnName,
          ColumnType : column.ColumnType,
          ColumnValue : "",
          ColumnOptions : []
        };
        question.Rows[0].Columns.push(rowColumn);
      });
    }
    inputType.Columns.push(column);
    console.log(JSON.stringify(inputType.SubQuestions));
  }

  newSurvey(){
    this.openForm = true;
    this.newPackage = {};
    this.newPackage.packageLocked = false;
    this.updateButton = false;
    this.startFlag = true;
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  openExistingForm(obj:any){
    this.openForm = true;
    this.newPackage = obj;
    this.updateButton = true;
    this.startFlag = true;
  }

  public constructor(private modalService: NgbModal,private dragulaService:DragulaService, public dataService:DataService,private router: Router, private route: ActivatedRoute,private dialogService:DialogService, private http: Http) {
    //this.packages = dataService.getPackages();
    this.openChildren = false;
    this.newPackage = {};
    this.openForm = false;
    this.updateButton = false;
    this.openTree = true;
    this.startFlag = false;
    dragulaService.setOptions('que-bag', {
      copy: function (el, source) {
        return source.id === 'left';
      },
      copySortSource: false,
      accepts: function(el, target, source, sibling) {
        return target.id !== 'left';
      }
    });
    this.showQueBox=[];
    this.dataStorage = [];
  }

  ngOnInit() {
    this.dataService.getSurveys().subscribe(response => {
      this.packages = response;
    });
    
  }

  createPackage(newPackage:any){
    //this.dialogService.addDialog(AlertComponent,{title:'Success!', message:'Package Updated Successfully!!!'});
    newPackage.sections = null;
    newPackage.affiliateGroups = null;
    console.log(newPackage);
    this.dataService.createSurvey(newPackage).subscribe(response => {
      console.log(response);
      this.currentSurvey = response[0];
      if(newPackage.packageLocked == false){
        this.openForm = false;
        this.ques = this.dataStorage;
      }
      this.updateButton = true;
      this.dataService.getSurveys().subscribe(response => {
        this.packages = response;
      });
    });
    
  }

  updatePackage(updatePackage:any){
    console.log(JSON.stringify(updatePackage));
    this.dataService.updateSurvey(updatePackage).subscribe(response => {
      this.currentSurvey = response;
      if(updatePackage.packageLocked == false){
        this.openForm = false;
        this.ques = this.dataStorage;
      }
    });
  }

  filterData(section:any){
    var filteredArr = [];
    for(let i=0;i<this.dataStorage.length;i++){
      if(this.dataStorage[i].sectionValue == section){
        filteredArr.push(this.dataStorage[i]);
      }
    }
    this.openForm = false;
    this.ques = filteredArr;
    this.startFlag = true;
  }

  ngOnDestroy() {
    this.dragulaService.destroy('que-bag');
  }
  public affiliateUsers:any=[];
  getAffGroupsForSurvey(surveyId:any,selUser:any){
    this.affiliateUsers=[];
    this.dataService.getSurveyGroups(surveyId).subscribe(response => {
      if(response.length>0){
        this.open(selUser);        
      }
      for(let i=0;i<response.length;i++){
        // this.dataService.getAffiliateGroupsListById(response[i].affiliateGroupId).subscribe(response =>{
        //   this.affiliateUsers =this.affiliateUsers.concat(response.users);
        // });
      } 
    });
  }

  saveData(){
    var sectionsArr = [];
    if(this.dataStorage.length ==0) {
      this.dataStorage = this.ques;
    }    
    this.ProcessSections(this.dataStorage);
    this.dataService.setCurrentSurveyId(this.currentSurvey.surveyId);
    console.log(JSON.stringify(this.currentSurvey));

    this.dataService.updateSurveyQuestions(this.surveyQuestions).subscribe(res => {
      console.log(JSON.stringify(res));
      this.router.navigate(['/view']);
    });
  }

  ProcessSections(data:any) {
    var sectionOptions = ["Section 1","Section2"];    
    var sections = [];
    data.forEach(function(sec){
      if(sections.indexOf(sec.SectionName) < 0){
        sections.push(sec.SectionName);        
      }
    });
    sections.sort();
    sections.forEach(section => {
      var eachSectionQuestions = [];      
      data.forEach(question => {
        let answerText ="";
        if(question.QuestionType == 7){
          question.Answer.AnswerText = null;
          question.Answers.forEach(function(ans){
            answerText = answerText+":"+ ans.AnswerText;
          });
        }
        
        if(section == question.SectionName){
          let eachQuestion = {
            QuestionName: question.QuestionName,
            QuestionType : question.QuestionType,
            Answer:{
              AnswerText:question.Answer.AnswerText? question.Answer.AnswerText:answerText,
              AnswerOptionsText:question.Answer.AnswerOptionsText.join(":")
            },
            SubQuestions : question.SubQuestions, 
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

  getSurveyQuestionsComp(){
    var allQuestions=[];
    this.dataService.getSurveyQuestions(this.currentSurvey.surveyId).subscribe(response =>{
      response.forEach(function(section){
        section.questions.forEach(function(question){          
          let dummyOptions =[];
          question.answer.answerOptionsText.split(":").forEach(function(){
            dummyOptions.push({});
          });
          let answers =[];
          if(question.questionType == 7){            
            question.answer.answerText.split(":").forEach(function(a){
              let ans:any ={};
              ans.AnswerText = a;
              answers.push(ans);              
            });
            answers.shift();
          }
          var SubQuestions = [];
          var columnNames = [];
          if((question.questionType == 4 || question.questionType == 8) && question.subQuestions.length>0){
            question.subQuestions[0].rows[0].columns.forEach(function(column){
              var col = {
                ColumnName : column.columnName,
                ColumnType : column.columnType
              }
              columnNames.push(col);
            });
            question.subQuestions.forEach(function(subQues){
              var subQuestion = {
                Rows : [ ]
              }
              var columns = [];            
              var row = {
                Columns : []
              }
              subQues.rows[0].columns.forEach(function(column){
                var col = {
                  ColumnName : column.columnName,
                  ColumnType : column.columnType
                }
                var rowColumn = {
                  "ColumnName": column.columnName,
                  "ColumnType": column.columnType,
                  "ColumnValue": column.columnValue,
                  "ColumnOptions": column.columnOptions                 
                }
                columns.push(rowColumn);
                row.Columns = columns;
                subQuestion.Rows.push(row);
              });
              SubQuestions.push(subQuestion);
            });
          }          
          let que = {
            "QuestionName":question.questionName,
            "QuestionType":question.questionType,
            "QuestionId":question.questionId,
            "Answer":{
              "AnswerText":question.answer.answerText,
              "AnswerOptionsText":question.answer.answerOptionsText.split(":")
            },
            "dummyOptions":dummyOptions,
            "SubQuestions":SubQuestions,
            "SectionName":section.sectionName,
            "Answers":answers,
            "Columns":columnNames 
          };

          allQuestions.push(que);
        });
      });
      this.ques = allQuestions;     
    });    
  }

  //@ViewChild('name') vc: ElementRef;
  // ngAfterContentChecked() {
  //   this.vc.nativeElement.focus();
  // }

  addRemoveClass(c:any, textDecorateField:any){
    switch (c) {
      case 'bold':
        if(textDecorateField.indexOf("bold-text") > 0){
          textDecorateField = textDecorateField.replace("bold-text","");
        }else{
          textDecorateField += " bold-text";
        }
        break;
      case 'italic':
        if(textDecorateField.indexOf("italic-text") > 0){
          textDecorateField = textDecorateField.replace("italic-text","");
        }else{
          textDecorateField += " italic-text";
        }
        break;
      case 'underline':
        if(textDecorateField.indexOf("underline-text") > 0){
          textDecorateField = textDecorateField.replace("underline-text","");
        }else{
          textDecorateField += " underline-text";
        }
        break;
      case 'strike':
        if(textDecorateField.indexOf("strike-text") > 0){
          textDecorateField = textDecorateField.replace("strike-text","");
        }else{
          textDecorateField += " strike-text";
        }
        break;
    }
    console.log(textDecorateField);
    
  }
  
}

import {Directive, Input,Inject, ElementRef,ChangeDetectorRef} from '@angular/core';
@Directive({
    selector: '[focus]'
})
export class FocusDirective {
    @Input('focus') focus:boolean;
    constructor(private el :ElementRef) {}
      protected ngOnChanges(){
        if(this.focus==true){
          setTimeout(() => {
            this.el.nativeElement.focus();
          }, 0);
          //this.el.nativeElement.focus();
        }
        if(this.focus==false){
          //this.el.nativeElement
        }
      }    
    
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}