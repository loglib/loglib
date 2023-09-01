import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { celebrateSettingAtom } from "@/jotai/store";
import { useAtom } from "jotai";
import { Terminal } from "lucide-react";

export const CelebrateSetting = () => {
	const [cSetting, setCSetting] = useAtom(celebrateSettingAtom);
	return (
		<div>
			<Alert>
				<Terminal size={18} />
				<AlertTitle className=" font-bold">
					This let's you set goals and get a
					<span className=" text-brand-400"> celebration.</span>
				</AlertTitle>
				<AlertDescription>
					The goals are calculated in the last 24 hours.
				</AlertDescription>
			</Alert>
			<div className=" flex flex-col space-y-2 mt-4">
				<Label>Enable Celebrations</Label>
				<Switch
					onCheckedChange={(checked) => {
						setCSetting((prev) => ({
							...prev,
							enabled: checked,
						}));
					}}
					checked={cSetting.enabled}
				/>
			</div>
			<div className=" space-y-2 mt-4">
				<Label>Unique Visitors Goal</Label>

				<Input
					type="number"
					className=" appearance-none"
					value={cSetting.uniqueVisitors}
					onChange={(v) => {
						setCSetting((prev) => ({
							...prev,
							uniqueVisitors: parseInt(v.currentTarget.value),
						}));
					}}
				/>
			</div>
		</div>
	);
};
