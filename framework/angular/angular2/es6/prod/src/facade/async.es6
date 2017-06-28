import {int,
  global,
  isPresent} from 'angular2/src/facade/lang';
import {List} from 'angular2/src/facade/collection';
import Rx from 'rx/dist/rx.all';
export var Promise = global.Promise;
export class PromiseWrapper {
  static resolve(obj) {
    return Promise.resolve(obj);
  }
  static reject(obj) {
    return Promise.reject(obj);
  }
  static catchError(promise, onError) {
    return promise.catch(onError);
  }
  static all(promises) {
    if (promises.length == 0)
      return Promise.resolve([]);
    return Promise.all(promises);
  }
  static then(promise, success, rejection) {
    return promise.then(success, rejection);
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
    global.setTimeout(fn, millis);
  }
  static isPromise(maybePromise) {
    return maybePromise instanceof Promise;
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
    return emitter.observer({
      next: onNext,
      throw: onThrow,
      return: onReturn
    });
  }
  static dispose(subscription) {
    subscription.dispose();
  }
  static isObservable(obs) {
    return obs instanceof Observable;
  }
  static callNext(emitter, value) {
    emitter.next(value);
  }
  static callThrow(emitter, error) {
    emitter.throw(error);
  }
  static callReturn(emitter) {
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
  observer(generator) {}
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
    return this._subject;
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