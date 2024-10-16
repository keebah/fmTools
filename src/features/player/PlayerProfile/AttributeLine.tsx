import { Input } from "../../../components/Input";
import {
  calcPhysisAbwehr,
  calcPhysisMittelfeld,
  calcPhysisAngriff,
} from "../../../helpers/loadData";
import { Attributes, Player } from "../../../types/player";

export const AttributeLine = ({
  attribute,
  player,
  setSelectedPlayer,
}: {
  attribute: keyof Attributes;
  player: Player | undefined;
  setSelectedPlayer?: React.Dispatch<React.SetStateAction<Player>>;
}) => (
  <div className="flex">
    <div>{attribute}</div>
    <div className="ml-auto">
      {setSelectedPlayer ? (
        <Input
          className="w-8"
          defaultValue={player?.attributes[attribute]}
          onChange={(e) => {
            setSelectedPlayer((prev) => {
              prev.attributes[attribute] = parseFloat(e.target.value);
              prev.physis.abwehr = calcPhysisAbwehr(prev.attributes);
              prev.physis.mittelfeld = calcPhysisMittelfeld(prev.attributes);
              prev.physis.angriff = calcPhysisAngriff(prev.attributes);

              return prev;
            });
          }}
          type="number"
        />
      ) : (
        player?.attributes[attribute]
      )}
    </div>
  </div>
);
