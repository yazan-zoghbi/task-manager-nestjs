import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true, unique: true, lowercase:true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  name: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
