import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { QuestionImage } from '../domain';

@EventSubscriber()
export class QuestionImageSubscriber implements EntitySubscriberInterface<QuestionImage> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return QuestionImage;
  }

  beforeRemove(event: RemoveEvent<QuestionImage>) {
    console.log(`BEFORE QUESTION_IMAGE REMOVE: `, event.entity);
  }
  
}
