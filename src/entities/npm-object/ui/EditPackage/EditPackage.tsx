import {
  Button,
  DateInput,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Input,
  Slider,
  Textarea,
} from '@vkontakte/vkui';
import { ChangeEvent, useEffect, useState } from 'react';
import { formatISO } from 'date-fns';
import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { useStore } from 'shared/model/store/root-store-context.ts';

import styles from './EditPackage.module.css';

interface EditDto {
  name: string;
  version: string;
  description: string;
  date?: Date;
  quality: number;
  popularity: number;
  maintenance: number;
  finalScore: number;
}

const convertForSlider = (num: number) => {
  return Number(num * 100);
};

const convertFromSlider = (num?: number) => {
  return num ? num / 100 : 0;
};

const EditPackage = () => {
  const [editDto, setEditDto] = useState<EditDto | null>(null);
  const {
    npmObjectsStore: { activeObject, submitEdit },
    appStore: { setAppView },
  } = useStore();

  useEffect(() => {
    if (activeObject) {
      setEditDto({
        name: activeObject.package.name,
        version: activeObject.package.version,
        description: activeObject.package.description,
        date: activeObject.package.date ? new Date(activeObject.package.date) : undefined,
        finalScore: convertForSlider(activeObject.score.final),
        maintenance: convertForSlider(activeObject.score.detail.maintenance),
        popularity: convertForSlider(activeObject.score.detail.popularity),
        quality: convertForSlider(activeObject.score.detail.quality),
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent, key: string) => {
    setEditDto((prevState) => {
      if (prevState) {
        return { ...prevState, [key]: (e.target as HTMLInputElement).value };
      }
      return null;
    });
  };

  const handleSlider = (value: number, key: string) => {
    setEditDto((prevState) => {
      if (prevState) {
        return value ? { ...prevState, [key]: value } : { ...prevState };
      }
      return null;
    });
  };

  const handleSubmit = () => {
    const newObject: NpmObject = {
      ...activeObject,
      package: {
        name: editDto?.name ?? '',
        version: editDto?.version ?? '',
        description: editDto?.description ?? '',
        date: editDto?.date ? formatISO(editDto?.date) : '',
        scope: activeObject?.package.scope ?? '',
      },
      score: {
        detail: {
          quality: convertFromSlider(editDto?.quality),
          popularity: convertFromSlider(editDto?.popularity),
          maintenance: convertFromSlider(editDto?.maintenance),
        },
        final: editDto?.finalScore ?? 0,
      },
      searchScore: activeObject?.searchScore ?? 0,
    };
    submitEdit(newObject);
    setAppView();
  };

  return (
    <>
      {editDto ? (
        <FormLayoutGroup>
          <FormItem top="Name">
            <Input
              id="name"
              type="text"
              align="center"
              value={editDto.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </FormItem>
          <FormItem top="Version">
            <Input
              id="version"
              type="text"
              align="center"
              value={editDto.version}
              onChange={(e) => handleChange(e, 'version')}
            />
          </FormItem>
          <FormItem top="Description">
            <Textarea
              id="description"
              align="center"
              value={editDto.description}
              onChange={(e) => handleChange(e, 'description')}
            />
          </FormItem>
          <FormItem top="Date">
            <DateInput
              id="date"
              value={editDto.date}
              onChange={(date) =>
                setEditDto((prevState) => {
                  if (prevState) {
                    return { ...prevState, date };
                  }
                  return null;
                })
              }
            />
          </FormItem>
          <FormLayoutGroup>
            <FormItem top="Quality">
              <Slider
                value={editDto.quality}
                withTooltip
                step={0.01}
                onChange={(v) => handleSlider(v, 'quality')}
              />
            </FormItem>
            <FormItem top="Popularity">
              <Slider
                value={editDto.popularity}
                withTooltip
                step={0.01}
                onChange={(v) => handleSlider(v, 'popularity')}
              />
            </FormItem>
            <FormItem top="Maintenance">
              <Slider
                value={editDto.maintenance}
                withTooltip
                step={0.01}
                onChange={(v) => handleSlider(v, 'maintenance')}
              />
            </FormItem>
            <FormItem top="Final">
              <Slider
                value={editDto.finalScore}
                withTooltip
                step={0.01}
                onChange={(v) => handleSlider(v, 'finalScore')}
              />
            </FormItem>
          </FormLayoutGroup>
          <div className={styles.button__container}>
            <Button type="submit" onClick={handleSubmit} appearance="positive" size="l">
              Submit changes
            </Button>
          </div>
        </FormLayoutGroup>
      ) : (
        <FormStatus header="Element isn&#39;t found" mode="error">
          You should choice the npm object to edit
        </FormStatus>
      )}
    </>
  );
};

export default EditPackage;
