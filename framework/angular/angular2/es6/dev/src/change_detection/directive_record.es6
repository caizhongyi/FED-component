import {assert} from "rtts_assert/rtts_assert";
import {ON_PUSH} from './constants';
import {StringWrapper} from 'angular2/src/facade/lang';
export class DirectiveRecord {
  constructor(elementIndex, directiveIndex, callOnAllChangesDone, callOnChange, changeDetection) {
    assert.argumentTypes(elementIndex, assert.type.number, directiveIndex, assert.type.number, callOnAllChangesDone, assert.type.boolean, callOnChange, assert.type.boolean, changeDetection, assert.type.string);
    this.elementIndex = elementIndex;
    this.directiveIndex = directiveIndex;
    this.callOnAllChangesDone = callOnAllChangesDone;
    this.callOnChange = callOnChange;
    this.changeDetection = changeDetection;
  }
  isOnPushChangeDetection() {
    return assert.returnType((StringWrapper.equals(this.changeDetection, ON_PUSH)), assert.type.boolean);
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