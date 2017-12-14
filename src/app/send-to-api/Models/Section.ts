import {Question} from './Question';
export class Section
{
   
    public Questions: Array<Question>;
    public MainQuestion: Question;
    public SectionName : string;   
    public ParentSectionId : number;
    
}