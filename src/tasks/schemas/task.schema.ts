import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

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

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]})
  assignedTo: User[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
