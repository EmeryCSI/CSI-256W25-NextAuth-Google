import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  email: string;
  roles: string[];
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  roles: [String], // Simple array of role strings
});

// Add a method to check if user has a specific role
UserSchema.methods.hasRole = function (roleName: string) {
  return this.roles.includes(roleName.toUpperCase());
};

// Create and export the model
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

// Define types for use in the application
export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  roles: string[];
}

// Default role when creating new users
export const DEFAULT_ROLE = "USER";
