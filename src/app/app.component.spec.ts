import { AppComponent } from './app.component';
import { of as observableOf } from 'rxjs/observable/of';

describe('AppComponent', () => {
  let appComponent;
  let rijksmuseumApiServiceMock;
  let getAllResponseMock;

  beforeEach(() => {
    rijksmuseumApiServiceMock = jasmine.createSpyObj('rijksmuseumApiService', [
      'getAll'
    ]);
    getAllResponseMock = {
      artObjects: 'artObjectsMock'
    };
    rijksmuseumApiServiceMock.getAll.and.returnValue(observableOf(getAllResponseMock));

    appComponent = new AppComponent(rijksmuseumApiServiceMock);
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      appComponent.ngOnInit();
    });

    it('should call getAll on rijksmuseumApiService with empty search query', () => {
      expect(rijksmuseumApiServiceMock.getAll).toHaveBeenCalledWith('');
    });

    it('should store artObjects from response', () => {
      expect(appComponent.artObjects).toBe(getAllResponseMock.artObjects);
    });
  });
});
