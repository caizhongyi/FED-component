import {ON_PUSH} from './constants';
import {StringWrapper} from 'angular2/src/facade/lang';
export class DirectiveRecord {
  constructor(elementIndex, directiveIndex, callOnAllChangesDone, callOnChange, changeDetection) {
    this.elementIndex = elementIndex;
    this.directiveIndex = directiveIndex;
    this.callOnAllChangesDone = callOnAllChangesDone;
    this.callOnChange = callOnChange;
    this.changeDetection = changeDetection;
  }
  isOnPushChangeDetection() {
    return StringWrapper.equals(this.changeDetection, ON_PUSH);
  }
  get name() {
    return `${this.elementIndex}_${this.directiveIndex}`;
  }
}
Object.defineProperty(DirectiveRecord, "parameters", {get: function() {
    return [[assert.type.number], [assert.type.number], [assert.type.boolean], [assert.type.boolean], [assert.type.string]];
  }});
//# sourceMappingURL=directive_record.js.map

//# sourceMappingURL=./directive_record.map