"use client";

import { apiKeyGenerateModalAtom } from "@/jotai/store";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export const GenerateKeys = ({ disabled }: { disabled: boolean }) => {
    const [, setModal] = useAtom(apiKeyGenerateModalAtom);

    return (
        <Button
            onClick={() => {
                if (disabled) {
                    toast({
                        title: "You need to add a website first",
                        description:
                            "You need to add a website first before you can generate an api key.",
                        variant: "destructive",
                    });
                } else {
                    setModal(true);
                }
            }}
            variant="secondary"
            className=" llc-ctc"
        >
            Generate New Key
        </Button>
    );
};

export const DeleteKeys = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    async function deleteKey() {
        try {
            setIsLoading(true);
            await fetch(`/api/api-keys/${id}`, {
                method: "DELETE",
            });
            toast({
                title: "API Key removed.",
            });
            setIsLoading(false);
            router.refresh();
        } catch {
            setIsLoading(false);
            toast({
                title: "Couldn't delete api key. Please try again later",
                variant: "destructive",
            });
        }
    }
    return (
        <Fragment>
            {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin text-red-500" />
            ) : (
                <Trash2 size={16} onClick={deleteKey} className=" text-red-500" />
            )}
        </Fragment>
    );
};
