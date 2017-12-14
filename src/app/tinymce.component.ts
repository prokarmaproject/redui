import {
  AfterViewInit, Component, ElementRef, forwardRef, Input,Output, EventEmitter,NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare let tinymce: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SimpleTinyComponent),
  multi: true
};

@Component({
  selector: 'simple-tiny',
  template: `<input #textArea [value]="value">`,
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy,  ControlValueAccessor {
  @Input() elementId: String;
  @Output() modelChange = new EventEmitter<any>();

  @ViewChild('textArea') textArea: ElementRef;

  editor: any;

  value: string;

  onChange = (_: any) => { };

  constructor(private zone: NgZone) {}

  writeValue(value: any): void {
    this.value = value;
    if (this.editor) {
      this.editor.setContent(value);
    }
  }

  ngAfterViewInit() {
    tinymce.init({
      skin_url: 'assets/skins/lightgray',
      target: this.textArea.nativeElement,
      menu: {
      },
      min_height: 45,
      width: 540,
      statusbar: false,
      // toolbar: 'mybutton',
      toolbar: [
    'undo redo | bold italic underline strikethrough | link image '
  ],
      plugins: ['link', 'paste', 'table'],
      // setup: editor => {
      //   this.editor = editor;
      //   editor.on('keyup click blur', () => {
      //     const content = editor.getContent();
      //     this.zone.run(() => this.onChange(content))
      //   });
      // }
      setup: (editor) =>{
      	this.editor = editor;
	    // editor.on('init', () => {
	    //   editor.setContent("Prokarma");
      // });
      // changeSection: function(){},
	    editor.on('change', () => {
            const content = editor.getContent();
            this.zone.run(() => this.onChange(content));
            //this.modelChange.emit(this.value());         
            console.log(content)
          });
          
      	// editor.addButton('mybutton', {
		    //   type: 'listbox',
		    //   text: '-- Select Sections --',
		    //   icon: false,
		    //   readonly:false,
		    //   onselect: function (e) {
		    //     //editor.insertContent('<span style="display:none">'+this.value()+'</span>');
        //     // const content = editor.getContent()+"#@#@#@"+this.value();
		    //   	// console.log(content)
		    //   },
		    //   values: [
		    //     { text: 'Section 1', value: 'Section 1' },
		    //     { text: 'Section 2', value: 'Section 2' },
		    //     { text: 'Section 3', value: 'Section 3' }
		    //   ],
		    //   onPostRender: function () {
		    //     // Select the second item by default
		    //     this.value('&nbsp;<em>Some italic text!</em>');
		    //   }
		    // });
      	 	
      }
    });
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
