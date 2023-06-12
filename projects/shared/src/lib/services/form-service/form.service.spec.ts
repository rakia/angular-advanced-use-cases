import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from './form.service';
import { ObjectType } from '../../models/object.types';

describe('FormService', () => {
  let formService: FormService;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FormService],
    });
    formService = new FormService(new FormBuilder());
    form = new FormGroup({});
  });

  it('should create a FormGroup from an entity', () => {
    const entity: ObjectType = {
      sourceFields: 'name',
      outputField: 'ip',
      targetField: '1.1.1.1',
    };
    const formGroup = formService.createFormGroupFromEntity(entity);
    expect(formGroup.value).toEqual({ sourceFields: 'name', outputField: 'ip', targetField: '1.1.1.1' });
  });

  it('should initialize the items in a FormArray', () => {
    const items = [
      { sourceFields: 'name', outputField: 'ip' },
      { sourceFields: 'id', outputField: 'dll' },
    ];
    formService.initFormArrayItems(form, 'mapping', items);
    const mappingArray = form.get('mapping') as FormArray;
    expect(mappingArray.controls.length).toEqual(items.length);
    expect(mappingArray.controls[0] instanceof FormGroup).toBeTruthy();
    expect(mappingArray.controls[0].value).toEqual({ sourceFields: 'name', outputField: 'ip' });
    expect(mappingArray.controls[1] instanceof FormGroup).toBeTruthy();
    expect(mappingArray.controls[1].value).toEqual({ sourceFields: 'id', outputField: 'dll' });
  });

  it('should add an empty FormGroup to a FormArray', () => {
    formService.initFormArrayItems(form, 'mapping', []);
    const formItem = { sourceFields: '', outputField: 'url' };
    formService.initFormArrayItems(form, 'mapping', [formItem]);
    const mappingArray = form.get('mapping') as FormArray;
    expect(mappingArray.controls.length).toEqual(1);
    expect(mappingArray.controls[0] instanceof FormGroup).toBeTruthy();
    expect(mappingArray.controls[0].value).toEqual({ sourceFields: '', outputField: 'url' });
    expect((mappingArray.controls[0] as FormGroup).controls['sourceFields'].value).toEqual('');
    expect((mappingArray.controls[0] as FormGroup).controls['outputField'].value).toBe('url');
  });

  it('should add items to a FormArray', () => {
    const items = [
      { sourceFields: 'name', outputField: 'ip' },
      { sourceFields: 'id', outputField: 'dll' },
    ];
    const arr = new FormArray([]);
    form.addControl('mapping', arr);
    formService.addItemsToFormArray('mapping', items, form);
    const mappingArray = form.get('mapping') as FormArray;
    expect(mappingArray.controls.length).toEqual(items.length);
    expect(mappingArray.controls[0] instanceof FormGroup).toBeTruthy();
    expect((mappingArray.controls[0] as FormGroup).controls['sourceFields'].value).toBe('name');
    expect((mappingArray.controls[0] as FormGroup).controls['outputField'].value).toBe('ip');
    expect((mappingArray.controls[1] as FormGroup).controls['sourceFields'].value).toBe('id');
    expect((mappingArray.controls[1] as FormGroup).controls['outputField'].value).toBe('dll');
  });

  it('should add a list of Items to a FormArray', () => {
    const items = [
      { id: 1, sourceFields: 'name', outputField: 'ip' },
      { id: 2, sourceFields: 'id', outputField: 'dll' },
    ];
    const arr = new FormArray([]);
    form.addControl('mapping', arr);
    formService.addItemsToFormArray('mapping', items, form);
    const mappingArray = form.get('mapping') as FormArray;
    expect((mappingArray.controls[0] as FormGroup).controls['sourceFields'].value).toEqual('name');
    expect((mappingArray.controls[0] as FormGroup).controls['outputField'].value).toEqual('ip');
    expect((mappingArray.controls[1] as FormGroup).controls['sourceFields'].value).toEqual('id');
    expect((mappingArray.controls[1] as FormGroup).controls['outputField'].value).toEqual('dll');
  });

  it('should add a list of Items to a FormArray', () => {
    jest.spyOn(formService, 'createFormArrayItem');
    const items = [
      { id: 1, sourceFields: 'name', outputField: 'ip' },
      { id: 2, sourceFields: 'id', outputField: 'dll' },
    ];
    const arr = new FormArray([]);
    form.addControl('mapping', arr);
    formService.addItemsToFormArray('mapping', items, form);
    expect(formService.createFormArrayItem).toHaveBeenCalled();
  });

  it('should create a FormArray item', () => {
    const item = { id: 1, sourceFields: 'name', outputField: 'ip' };
    const formArrayItem = formService.createFormArrayItem(item);
    expect(formArrayItem instanceof FormGroup).toBeTruthy();
    expect((formArrayItem as FormGroup).controls['sourceFields'].value).toBe('name');
    expect((formArrayItem as FormGroup).controls['id'].value).toBe(1);
    expect((formArrayItem as FormGroup).controls['outputField'].value).toBe('ip');
  });
});
