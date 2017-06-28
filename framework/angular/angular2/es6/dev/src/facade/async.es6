import {assert} from "rtts_assert/rtts_assert";
import {int,
  global,
  isPresent} from 'angular2/src/facade/lang';
import {List} from 'angular2/src/facade/collection';
import Rx from 'rx/dist/rx.all';
export var Promise = global.Promise;
export class PromiseWrapper {
  static resolve(obj) {
    return assert.returnType((Promise.resolve(obj)), Promise);
  }
  static reject(obj) {
    return assert.returnType((Promise.reject(obj)), Promise);
  }
  static catchError(promise, onError) {
    assert.argumentTypes(promise, Promise, onError, Function);
    return assert.returnType((promise.catch(onError)), Promise);
  }
  static all(promises) {
    assert.argumentTypes(promises, List);
    if (promises.length == 0)
      return assert.returnType((Promise.resolve([])), Promise);
    return assert.returnType((Promise.all(promises)), Promise);
  }
  static then(promise, success, rejection) {
    assert.argumentTypes(promise, Promise, success, Function, rejection, Function);
    return assert.returnType((promise.then(success, rejection)), Promise);
  }
  static completer() {
    var resolve;
    var reject;
    var p = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });
    return {
      promise: p,
      resolve: resolve,
      reject: reject
    };
  }
  static setTimeout(fn, millis) {
    assert.argumentTypes(fn, Function, millis, int);
    global.setTimeout(fn, millis);
  }
  static isPromise(maybePromise) {
    return assert.returnType((maybePromise instanceof Promise), assert.type.boolean);
  }
}
Object.defineProperty(PromiseWrapper.catchError, "parameters", {get: function() {
    return [[Promise], [Function]];
  }});
Object.defineProperty(PromiseWrapper.all, "parameters", {get: function() {
    return [[List]];
  }});
Object.defineProperty(PromiseWrapper.then, "parameters", {get: function() {
    return [[Promise], [Function], [Function]];
  }});
Object.defineProperty(PromiseWrapper.setTimeout, "parameters", {get: function() {
    return [[Function], [int]];
  }});
export class ObservableWrapper {
  static subscribe(emitter, onNext, onThrow = null, onReturn = null) {
    assert.argumentTypes(emitter, EventEmitter, onNext, assert.type.any, onThrow, assert.type.any, onReturn, assert.type.any);
    return emitter.observer({
      next: onNext,
      throw: onThrow,
      return: onReturn
    });
  }
  static dispose(subscription) {
    assert.argumentTypes(subscription, assert.type.any);
    subscription.dispose();
  }
  static isObservable(obs) {
    return assert.returnType((obs instanceof Observable), assert.type.boolean);
  }
  static callNext(emitter, value) {
    assert.argumentTypes(emitter, EventEmitter, value, assert.type.any);
    emitter.next(value);
  }
  static callThrow(emitter, error) {
    assert.argumentTypes(emitter, EventEmitter, error, assert.type.any);
    emitter.throw(error);
  }
  static callReturn(emitter) {
    assert.argumentTypes(emitter, EventEmitter);
    emitter.return();
  }
}
Object.defineProperty(ObservableWrapper.subscribe, "parameters", {get: function() {
    return [[EventEmitter], [], [], []];
  }});
Object.defineProperty(ObservableWrapper.dispose, "parameters", {get: function() {
    return [[assert.type.any]];
  }});
Object.defineProperty(ObservableWrapper.callNext, "parameters", {get: function() {
    return [[EventEmitter], [assert.type.any]];
  }});
Object.defineProperty(ObservableWrapper.callThrow, "parameters", {get: function() {
    return [[EventEmitter], [assert.type.any]];
  }});
Object.defineProperty(ObservableWrapper.callReturn, "parameters", {get: function() {
    return [[EventEmitter]];
  }});
export class Observable {
  observer(generator) {
    assert.argumentTypes(generator, Function);
  }
}
Object.defineProperty(Observable.prototype.observer, "parameters", {get: function() {
    return [[Function]];
  }});
export class EventEmitter extends Observable {
  constructor() {
    super();
    this._subject = new Rx.Subject();
  }
  observer(generator) {
    return this._subject.observeOn(Rx.Scheduler.immediate).subscribe((value) => {
      setTimeout(() => generator.next(value));
    }, (error) => generator.throw ? generator.throw(error) : null, () => generator.return ? generator.return() : null);
  }
  toRx() {
    return assert.returnType((this._subject), Rx.Observable);
  }
  next(value) {
    this._subject.onNext(value);
  }
  throw(error) {
    this._subject.onError(error);
  }
  return(value) {
    this._subject.onCompleted();
  }
}
//# sourceMappingURL=async.es6.map

//# sourceMappingURL=./async.map