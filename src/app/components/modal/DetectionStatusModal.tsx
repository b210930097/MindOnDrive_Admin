'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import type { User } from '@/types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { curveBasis } from '@visx/curve';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { detectionConvert } from '@/utils';
import { UserCard } from '@/components';

const width = 700,
  height = 300,
  margin = { top: 20, right: 30, bottom: 30, left: 100 };

export function DetectionStatusModal({
  record,
  onClose,
}: {
  record: User;
  onClose: () => void;
}) {
  const [data, setData] = useState<{ x: Date; y: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({
      x: new Date(Date.now() - (19 - i) * 1000),
      y: 0,
    })),
  );

  const currentYRef = useRef(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!record.uid) return;

    const ref = doc(db, 'users', record.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const status = snap.data()?.detectionStatus ?? '';
      currentYRef.current = detectionConvert(status);
    });

    return () => unsub();
  }, [record.uid]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(1),
        { x: new Date(), y: currentYRef.current },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      setNow(Date.now());
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const xScale = scaleTime({
    domain: [new Date(now - 19000), new Date(now)],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [-0.5, 2.5],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      title="Жолоочийн ажлын явц (Realtime)"
      width={width + 40}
    >
      <div className="space-y-sm">
        <UserCard user={record} />

        {record.workStatus === 'Бэлэн' ? (
          <svg width={width} height={height}>
            <AxisBottom scale={xScale} top={height - margin.bottom} />
            <AxisLeft
              scale={yScale}
              left={margin.left}
              tickFormat={(v) =>
                ['Сэрүүн', 'Сатаарсан', 'Зүүрмэглэсэн'][Number(v)] ?? ''
              }
              tickLabelProps={() => ({
                fontSize: 12,
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0.33em',
              })}
            />

            <LinePath
              data={data}
              x={(d) => xScale(d.x)}
              y={(d) => yScale(d.y)}
              stroke="#4f46e5"
              strokeWidth={2}
              curve={curveBasis}
            />
          </svg>
        ) : (
          <div className="flex items-center justify-center">
            <p>Жолооч ажилд {record.workStatus} байна</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
