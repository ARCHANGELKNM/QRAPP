"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import QRcode from "react-qr-code";
import { Button } from "@components/ui/button";

export default function Generator() {
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [category, setCategory] = useState("");
  const combinedInputs = name + " " + surname + " " + category + " " + grade;
  return (
    <div>
      <div className={"flex justify-center items-center ml-5"}>
        <Card
          className={
            "relative  w-72 h-96  place-content-center mt-20 bg-transparent shadow-2xl sm:w-72   md:w-96 md:h-96    xl:w-54 "
          }
        >
          <CardHeader>
            <CardTitle
              className={"font-bold text-2xl relative flex justify-center "}
            >
              Inputs
            </CardTitle>

            <CardDescription className={"flex justify-center"}>
              Please Provide Inputs
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <Input
              className={"mt-2"}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />

            <Input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(evt) => setSurname(evt.target.value)}
            />

            <Input
              type="text"
              placeholder="Grade"
              value={grade}
              onChange={(evt) => setGrade(evt.target.value)}
            />

            <Drawer className={""}>
              <DrawerTrigger asChild className={""}>
                <div className={" flex justify-center"}>
                  <Button className={""}>Generate</Button>
                </div>
              </DrawerTrigger>

              <DrawerContent className={" h-3/4 w-screen "}>
                <DrawerHeader className={"flex justify-center items-center"}>
                  <DrawerTitle
                    className={
                      "font-bold text-2xl flex justify-center items-center "
                    }
                  >
                    Task Complete
                  </DrawerTitle>

                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className={""}>
                  <div
                    className={
                      "absolute top-0 -left-4  w-32 h-32  rounded-full bg-red-300 mix-blend-multiply   blur-xl  animate-blob opacity-70 delay-1000"
                    }
                  ></div>

                  <div
                    className={
                      "absolute top-0 left-2 w-32 h-32 rounded-full bg-yellow-300 mix-blend-multiply   blur-xl  animate-blob  opacity-70"
                    }
                  ></div>

                  <div
                    className={
                      "absolute top-0 left-20  w-32 h-32 rounded-full bg-blue-300 mix-blend-multiply   blur-xl  animate-blob  opacity-70"
                    }
                  ></div>
                </div>

                <div className={" flex justify-center"}>
                  <QRcode
                    value={combinedInputs}
                    className={"absolute  mb-5 flex justify-center  "}
                    fgColor="#000000"
                  />
                </div>

                <DrawerClose asChild>
                  <div className={"flex justify-center"}>
                    <Button className={"absolute bottom-0"}>Close</Button>
                  </div>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
