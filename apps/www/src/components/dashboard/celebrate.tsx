import { PartyPopper, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GeneralSetting } from "./setting/general";
import { CelebrateSetting } from "./setting/celebrate-setting";
import { useAtom } from "jotai";
import { celebrateSettingAtom } from "@/jotai/store";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { getLast24Hour } from "@/lib/time-helper";
import { block } from "million/react";
import { loglib } from "@loglib/tracker";

function getAnimationSettings(angle: number, originX: number) {
    return {
        particleCount: 1,
        angle,
        spread: 40,
        origin: { x: originX },
        colors: ["#d27800", "#ffffff"],
    };
}

export function CelebrateFn({
    pageview,
    uniqVisitor,
    websiteId,
}: { pageview?: number; uniqVisitor?: number; websiteId?: string }) {
    const refAnimationInstance = useRef<confetti.CreateTypes | null>();
    const [intervalId, setIntervalId] = useState<any>();
    const [show, setShow] = useState(false);

    const getInstance = useCallback((instance: confetti.CreateTypes | null) => {
        refAnimationInstance.current = instance;
    }, []);

    const [cSetting, setCSetting] = useAtom(celebrateSettingAtom);

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(60, 0));
            refAnimationInstance.current(getAnimationSettings(120, 1));
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 16));
        }
    }, [nextTickAnimation, intervalId]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        setShow(false);
    }, [intervalId]);

    useEffect(() => {
        if (intervalId) {
            setTimeout(() => {
                pauseAnimation();
            }, 5000);
        }
    }, [intervalId]);

    useEffect(() => {
        if (cSetting.enabled && uniqVisitor) {
            const last24 = getLast24Hour();
            const shownToday = cSetting.lastShown > last24.getTime();
            if (!shownToday && uniqVisitor >= cSetting.uniqueVisitors) {
                setShow(true);
                startAnimation();
                setCSetting((p) => ({
                    ...p,
                    lastShown: Date.now(),
                    uniqueVisitors: cSetting.uniqueVisitors + 10,
                }));
                loglib.track("celebrate-animation-shown", {
                    uniqVisitor,
                    websiteId,
                });
            }
        }
    }, [cSetting.lastShown, uniqVisitor]);
    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    className=" flex items-center gap-2"
                    onClick={() => {
                        startAnimation();
                        loglib.track("celebrate-animation-clicked", {
                            uniqVisitor,
                            websiteId,
                        });
                    }}
                >
                    <PartyPopper size={15} className=" text-brand-600" />
                    Celebrate
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                            <Settings size={15} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <Tabs>
                            <TabsList>
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="celebrate">Celebrate</TabsTrigger>
                            </TabsList>
                            <TabsContent value="general">
                                <GeneralSetting />
                            </TabsContent>
                            <TabsContent value="celebrate">
                                <CelebrateSetting />
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>
            <ReactCanvasConfetti
                refConfetti={getInstance}
                style={{
                    position: "fixed",
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                }}
            />
            <AnimatePresence>
                {show ? (
                    <Modal
                        isOpen={show}
                        onRequestClose={() => {
                            setShow(false);
                            pauseAnimation();
                        }}
                        className="font-jost flex h-full items-center justify-center border-none outline-none backdrop:blur-xl"
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(2px)",
                            },
                            content: {},
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    scale: 0.8,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            transition={{
                                type: "keyframes",
                                delay: 0.1,
                                ease: "easeInOut",
                                duration: 0.3,
                            }}
                            className="animate-in relative flex w-11/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-stone-900/20 md:w-3/12"
                        >
                            {/* TODO: Imporve this make it more intersting */}
                            <h3 className=" text-2xl text-center">
                                Yooo! today your site stats have been 🤯{" "}
                                <h4 className=" text-brand-600 font-bold text-xl">
                                    {uniqVisitor} Unique Visitor & {pageview} Page Views
                                </h4>
                            </h3>
                        </motion.div>
                    </Modal>
                ) : null}
            </AnimatePresence>
        </>
    );
}

export const Celebrate = block(CelebrateFn);
