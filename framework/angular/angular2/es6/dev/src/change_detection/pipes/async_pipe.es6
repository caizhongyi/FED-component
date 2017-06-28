import {assert} from "rtts_assert/rtts_assert";
import {Observable,
  ObservableWrapper} from 'angular2/src/facade/async';
import {isBlank,
  isPresent} from 'angular2/src/facade/lang';
import {Pipe,
  NO_CHANGE} from './pipe';
import {ChangeDetectorRef} from '../change_detector_ref';
export class AsyncPipe extends Pipe {
  constructor(ref) {
    assert.argumentTypes(ref, ChangeDetectorRef);
    super();
    this._ref = ref;
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._observable = null;
  }
  supports(obs) {
    return assert.returnType((ObservableWrapper.isObservable(obs)), assert.type.boolean);
  }
  onDestroy() {
    if (isPresent(this._subscription)) {
      this._dispose();
    }
    ;
  }
  transform(obs) {
    assert.argumentTypes(obs, Observable);
    if (isBlank(this._subscription)) {
      this._subscribe(obs);
      return assert.returnType((null), assert.type.any);
    }
    if (obs !== this._observable) {
      this._dispose();
      return assert.returnType((this.transform(obs)), assert.type.any);
    }
    if (this._latestValue === this._latestReturnedValue) {
      return assert.returnType((NO_CHANGE), assert.type.any);
    } else {
      this._latestReturnedValue = this._latestValue;
      return assert.returnType((this._latestValue), assert.type.any);
    }
  }
  _subscribe(obs) {
    this._observable = obs;
    this._subscription = ObservableWrapper.subscribe(obs, (value) => this._updateLatestValue(value), (e) => {
      throw e;
    });
  }
  _dispose() {
    ObservableWrapper.dispose(this._subscription);
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._observable = null;
  }
  _updateLatestValue(value) {
    assert.argumentTypes(value, Object);
    this._latestValue = value;
    this._ref.requestCheck();
  }
}
Object.defineProperty(AsyncPipe, "parameters", {get: function() {
    return [[ChangeDetectorRef]];
  }});
Object.defineProperty(AsyncPipe.prototype.transform, "parameters", {get: function() {
    return [[Observable]];
  }});
Object.defineProperty(AsyncPipe.prototype._subscribe, "parameters", {get: function() {
    return [[Observable]];
  }});
Object.defineProperty(AsyncPipe.prototype._updateLatestValue, "parameters", {get: function() {
    return [[Object]];
  }});
export class AsyncPipeFactory {
  supports(obs) {
    return assert.returnType((ObservableWrapper.isObservable(obs)), assert.type.boolean);
  }
  create(cdRef) {
    return assert.returnType((new AsyncPipe(cdRef)), Pipe);
  }
}
//# sourceMappingURL=async_pipe.js.map

//# sourceMappingURL=./async_pipe.map