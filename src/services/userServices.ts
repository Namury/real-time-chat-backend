import { prisma } from "$utils/prisma.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
interface RegisterUserObject {
  username: string;
  password: string;
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
  username: string,
  password: string
): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user);
      const userDetails: UserResponseObject = {
        token: token,
        username: user.username,
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
    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });

    const token = createToken(createdUser);

    return { status: true, user: createdUser, token };
  } catch (err: any) {
    return { status: false, error: "Register Failed" };
  }
}
