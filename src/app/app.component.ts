import { Component, Input } from '@angular/core';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
 

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('bag-task1', {      
            copy: true,
            accepts: function (el, container, handle) {
              console.log(el);
              console.log(container);
              console.log(handle);
              return container.id !== 'no-drop';
            },
            
            
      
          });
      
          dragulaService.drop.subscribe(value => {
            const [bagName, e, el] = value;
            console.log('id is:', e.dataset.id);
        });

   }

  
}
