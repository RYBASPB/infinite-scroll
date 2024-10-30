import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { observer } from 'mobx-react-lite';
import { useStore } from 'npm-object/model/store/npm-objects-store-context.ts';
import { Card, FormItem, IconButton, Paragraph, Progress, Title } from '@vkontakte/vkui';
import { Icon32Write, Icon36Delete } from '@vkontakte/icons';
import { lightFormat } from 'date-fns';

import styles from './PackageCard.module.css';

const PackageCard = observer(({ object }: { object: NpmObject }) => {
  const { deleteObject, editObject } = useStore();
  const { score } = object;
  const { name, description, version, date } = object.package;
  return (
    <Card mode="shadow">
      <div className={styles.card__inner}>
        <Title level="3">{name}</Title>
        {[`v: ${version}`, description, lightFormat(new Date(date), 'yyyy-MM-dd')].map((prop) => (
          <Paragraph key={prop} Component="p" normalize>
            {prop}
          </Paragraph>
        ))}

        <FormItem id="quality" top={`Quality score: ${(score.detail.quality * 100).toFixed(2)}`} noPadding>
          <Progress aria-labelledby="quality" value={score.detail.quality * 100} />
        </FormItem>

        <FormItem id="popularity" top={`Popularity score: ${(score.detail.popularity * 100).toFixed(2)}`} noPadding>
          <Progress aria-labelledby="popularity" value={score.detail.popularity * 100} />
        </FormItem>

        <FormItem id="maintenance" top={`Maintenance score: ${(score.detail.maintenance * 100).toFixed(2)}`} noPadding>
          <Progress aria-labelledby="maintenance" value={score.detail.maintenance * 100} />
        </FormItem>

        <FormItem id="score-final" top={`Final score: ${(score.final * 100).toFixed(2)}`} noPadding>
          <Progress aria-labelledby="score-final" value={score.final * 100} />
        </FormItem>
        <div className={styles.button__container}>
          <IconButton onClick={() => editObject(name, object)}>
            <Icon32Write />
          </IconButton>
          <IconButton title="Удалить 36" onClick={() => deleteObject(name)}>
            <Icon36Delete fill="#ff3347" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
});

export default PackageCard;