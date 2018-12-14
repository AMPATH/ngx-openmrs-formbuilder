import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
@Injectable()
export class MockDataSourceService {
    constructor(){

    }
    sampleSearch(): Observable<any> {
        const items: Array<any> = [
        { value: '0', label: 'Aech' },
        { value: '5b6e58ea-1359-11df-a1f1-0026b9348838', label: 'Art3mis' },
        { value: '2', label: 'Daito' },
        { value: '3', label: 'Parzival' },
        { value: '4', label: 'Shoto' }];
        return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
                observer.next(items);
            }, 1000);

        });
    }

      sampleProviderSearch(): Observable<any> {
        const items: Array<any> = [
          {
             value : 'p28f1f96-baae-42b5-8df9-d4d98a0f42e3',
             label: '1552-9 - MELIBA MELIBA MELIBA',
        },
        {
           value: 'p5ff5ba7-e16e-4b6a-b5cd-00f0382377ab',
           label: '1973-7 - Shihati Shihati Shihati',
        },
        {
            value : 'p589c677-5b0b-47a2-a0ba-cc43963b9267',
            label : '2363-0 - ROSESIS ROSESIS ROSESIS',
        },
        {
            value : 'ec07fc28-812f-4450-a8d1-4ebc3ec5d876',
            label : 'Ampath Test Provider'
        }
        ];
        return Observable.create((observer: Subject<any>) => {
            setTimeout(() => {
                observer.next(items);
            }, 1000);

        });
      }

    sampleResolve(): Observable<any> {
      const item = { value: '1', label: 'Art3mis' };
      return Observable.create((observer: Subject<any>) => {
          setTimeout(() => {
              observer.next(item);
          }, 1000);

      });
}

  sampleProviderResolve(): Observable<any> {
    const item = { value: '0', label: 'Ampath Test' };
    return Observable.create((observer: Subject<any>) => {
        setTimeout(() => {
            observer.next(item);
        }, 1000);

    });
}
}
