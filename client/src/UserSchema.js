import * as Yup from 'yup';


const UserSchema = Yup.object().shape({
    userName : Yup.string().email("has to be a valid email address")
    // .min(5, "At least 5 Chars")
    // .max(15, "At most 15 Chars")
    .required("User Name is Required"),
    password : Yup.string()
    .min(8, "At least 8 Chars")
    .required("Password is required")
});

const message = `If I have ignored files on a branch in my
 local git repo, but the gitignore is only in the branch, 
 when I check out to the master branch will the ignored files persist? 
To explain the scenario I created a client folder in a branch
 with vite And it gave me node modules and the git ignore file as
  usual, but when I check back out to the master branch the node modules 
  folder comes in as uncommitted changes, I don't understand why the
   entire client folder was only created on the branch why is it even 
   coming up in the master branch`

const searchTerm = /[abcdefghijklmnopqrstuvwxyz]/
const result = searchTerm.test('a')

console.log(result)


export default UserSchema;