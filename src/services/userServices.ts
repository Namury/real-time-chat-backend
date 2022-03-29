import { prisma } from "$utils/prisma.utils";
import jwt from "jsonwebtoken";
import "dotenv/config";
interface RegisterUserObject {
  name:string,
}

function createToken(user: any) {
  const token = jwt.sign(
    { id: user.id, email: user.email, schoolId: user.schoolId },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

interface UserResponseObject {
  token: string;
  name: string;
}

export async function userLoginService(
  name: string
): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: { name: name },
    });
    if (user) {
      const token = createToken(user);
      const userDetails: UserResponseObject = {
        token: token,
        name: user.name
      };

      return { status: true, userDetails };
      
    } else {
      throw new Error("Incorrect");
    }
  } catch (err: any) {
    return { status: false, error: "Unauthorized" };
  }
}

export async function userRegisterService(
  user: RegisterUserObject
): Promise<any> {
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
      },
    });
    
    const token = createToken(createdUser);

    return { status: true, user: createdUser, token };
  } catch (err: any) {
    return { status: false, error: "Register Failed" };
  }
}