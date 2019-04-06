import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "form-builder",
  template: `
    <div class="col-sm-12">
      <div class="card">
        <div class="card-body">
          <form
            (ngSubmit)="onSubmit.emit(this.form.value)"
            [formGroup]="form"
            class="form-horizontal"
          >
            <div *ngFor="let field of formFields">
              <field-builder [field]="field" [form]="form"></field-builder>
            </div>
            <button type="submit" [disabled]="!form.valid" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class FormBuilderComponent implements OnInit {
  @Input() formFields: any[];
  @Output() onSubmit = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formFields = [
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        value: "",
        required: true
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
        value: "",
        required: true,
        additionalValidation: () => true
      },
      {
        type: "text",
        name: "email",
        label: "Email",
        value: "",
        required: true
      },
      {
        type: "file",
        name: "picture",
        label: "Picture",
        required: true,
        onUpload: null
      },
      {
        type: "dropdown",
        name: "country",
        label: "Country",
        value: "in",
        options: [{ key: "in", label: "India" }, { key: "us", label: "USA" }]
      },
      {
        type: "radio",
        name: "country",
        label: "Country",
        value: "in",
        required: true,
        options: [{ key: "m", label: "Male" }, { key: "f", label: "Female" }]
      },
      {
        type: "checkbox",
        name: "hobby",
        label: "Hobby",
        required: true,
        options: [
          { key: "f", label: "Fishing" },
          { key: "c", label: "Cooking" }
        ]
      }
    ];
    this.form = this.formBuilder.group(
      this.formatJsonInputToForm(this.formFields)
    );
  }

  formatJsonInputToForm(fieldsJson: any[]) {
    return fieldsJson.reduce((fieldsCtrls, f) => {
      if (f.type != "checkbox") {
        fieldsCtrls[f.name] = new FormControl(
          f.value || "",
          f.required ? Validators.required : null
        );
      } else {
        //if checkbox, it need mulitple
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
      return fieldsCtrls;
    }, {});
  }
}
