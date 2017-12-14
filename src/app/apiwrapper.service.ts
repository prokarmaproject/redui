import { Injectable } from '@angular/core';

@Injectable()
export class APIWrapperService {

  jsonObject = `[
    {
      "answer": "answer 1",
      "questionText": "Write your question for text",
      "questionType": "textField",
      "sectionName": "Section 1"
    },
    {
      "answer": "",
      "questionText": "Write your question for label",
      "questionType": "label",
      "sectionName": "Section 1",
      "subQuestions": [
        {
          "subQueAnswer": false,
          "subQueText": "sub question 1",
          "subQueType": "checkBox"
        },
        {
          "subQueAnswer": false,
          "subQueText": "sub question 1",
          "subQueType": "checkBox"
        },
        {
          "subQueAnswer": false,
          "subQueText": "sub question 3",
          "subQueType": "input"
        }
      ]
    },
    {
      "answer": "one",
      "questionText": "Write your question for radio button",
      "questionType": "radioButton",
      "sectionName": "Section 2",
      "options": [
        "one",
        "two"
      ]
    },
    {
      "questionText": "Write your question for Table",
      "questionType": "table",
      "sectionName": "Section 2",
      "subQuestions": [
        {
          "subQueAnswer": false,
          "subQueText": "sub question 1",
          "subQueType": "checkBox"
        },
        {
          "subQueAnswer": false,
          "subQueText": "sub question 2",
          "subQueType": "radio"
        },
        {
          "subQueAnswer": false,
          "subQueText": "sub question 3",
          "subQueType": "input"
        }
      ]
    },
    {
      "questionText": "Write your question for checkbox",
      "questionType": "checkBox",
      "sectionName": "Section 3",
      "answer": "",
      "options": [
        "Option 1",
        "Option 2"
      ]
    },
    {
      "answer": "2017-10-17",
      "questionText": "write your question for Date",
      "questionType": "date",
      "sectionName": "Section 4"    
    }
    ]`;

  jsonConverted: any;

  constructor() { }

  getFromUI() {
    this.jsonConverted = JSON.parse(this.jsonObject);
return this.jsonConverted;

  }

}
