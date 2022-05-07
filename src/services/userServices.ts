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
    { id: user.id, username: user.username },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

interface UserResponseObject {
  token: string;
  username: string;
  userId: number;
  userUuid: string;
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
        userId: user.id,
        userUuid: user.uuid
      };
      return { status: true, user:userDetails };
    } else {
      return { status: false, error: "Login Failed" };
    }
  } catch (err: any) {
    return { status: false, error: "Unauthorized" };
  }
}

export async function userRegisterService(
  user: RegisterUserObject
): Promise<any> {
  try {
    const findUser = await prisma.user.findFirst({
      where: { username: user.username },
    });

    if (findUser) {
      return { status: false, error: "Username Already Exist" };
    }

    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });

    const token = createToken(createdUser);

    const userDetails: UserResponseObject = {
      token: token,
      username: createdUser.username,
      userId: createdUser.id,
      userUuid: createdUser.uuid
    };

    return { status: true, user: userDetails };
  } catch (err: any) {
    return { status: false, error: "Register Failed" };
  }
}

export async function editUserService(
  userUuid: string,
  username: string,
  oldUsername: string
) {
  try {
    const findUser = await prisma.user.findFirst({
      where: { username },
    });

    if (findUser && findUser.username !== oldUsername) {
      return { status: false, error: "Username Already Exist" };
    }

    const updatedUser = await prisma.user.update({
      where: {
        uuid: userUuid
      },
      data: {
        username,
      },
    });

    const responseUser = {
      username: updatedUser.username,
      userId: updatedUser.id,
      userUuid: updatedUser.uuid
    }

    return { status: true, user: responseUser };
  } catch (err: any) {
    return { status: false, error: err };
  }
}
