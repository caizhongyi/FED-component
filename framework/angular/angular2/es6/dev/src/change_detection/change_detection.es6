import {assert} from "rtts_assert/rtts_assert";
import {DynamicProtoChangeDetector,
  JitProtoChangeDetector} from './proto_change_detector';
import {PipeRegistry} from './pipes/pipe_registry';
import {IterableChangesFactory} from './pipes/iterable_changes';
import {KeyValueChangesFactory} from './pipes/keyvalue_changes';
import {AsyncPipeFactory} from './pipes/async_pipe';
import {NullPipeFactory} from './pipes/null_pipe';
import {DEFAULT} from './constants';
import {ChangeDetection,
  ProtoChangeDetector} from './interfaces';
import {Injectable} from 'angular2/di';
export var keyValDiff = [new KeyValueChangesFactory(), new NullPipeFactory()];
export var iterableDiff = [new IterableChangesFactory(), new NullPipeFactory()];
export var async = [new AsyncPipeFactory(), new NullPipeFactory()];
export var defaultPipes = {
  "iterableDiff": iterableDiff,
  "keyValDiff": keyValDiff,
  "async": async
};
export class DynamicChangeDetection extends ChangeDetection {
  constructor(registry) {
    assert.argumentTypes(registry, PipeRegistry);
    super();
    this.registry = registry;
  }
  createProtoChangeDetector(name, changeControlStrategy = DEFAULT) {
    assert.argumentTypes(name, assert.type.string, changeControlStrategy, assert.type.string);
    return assert.returnType((new DynamicProtoChangeDetector(this.registry, changeControlStrategy)), ProtoChangeDetector);
  }
}
Object.defineProperty(DynamicChangeDetection, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(DynamicChangeDetection, "parameters", {get: function() {
    return [[PipeRegistry]];
  }});
Object.defineProperty(DynamicChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
export class JitChangeDetection extends ChangeDetection {
  constructor(registry) {
    assert.argumentTypes(registry, PipeRegistry);
    super();
    this.registry = registry;
  }
  createProtoChangeDetector(name, changeControlStrategy = DEFAULT) {
    assert.argumentTypes(name, assert.type.string, changeControlStrategy, assert.type.string);
    return assert.returnType((new JitProtoChangeDetector(this.registry, changeControlStrategy)), ProtoChangeDetector);
  }
}
Object.defineProperty(JitChangeDetection, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(JitChangeDetection, "parameters", {get: function() {
    return [[PipeRegistry]];
  }});
Object.defineProperty(JitChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
export var defaultPipeRegistry = new PipeRegistry(defaultPipes);
//# sourceMappingURL=change_detection.js.map

//# sourceMappingURL=./change_detection.map