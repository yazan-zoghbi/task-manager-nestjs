import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({timestamps: true})
export class Task {

  @Prop({required: true})
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop({default : "to do"})
  status: string;

  @Prop()
  assignedTo: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
