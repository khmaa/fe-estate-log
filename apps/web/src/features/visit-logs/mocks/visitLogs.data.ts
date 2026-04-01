import type { VisitLog } from '../types/visitLog';

const initialVisitLogs: VisitLog[] = [
  {
    id: 'visit-log-1',
    title: '삼성동 한강뷰 아파트 재방문',
    district: '강남구',
    propertyType: 'apartment',
    status: 'completed',
    visitedAt: '2026-03-27T10:30:00.000Z',
    priceLabel: 'KRW 1.28B',
    agentName: '박민지',
    isPinned: true,
    summary:
      '채광과 지하철 접근성은 좋았지만 로비와 주차 동선은 다소 노후한 인상이었다.',
  },
  {
    id: 'visit-log-2',
    title: '성수 복합용도 오피스 층',
    district: '성동구',
    propertyType: 'office',
    status: 'scheduled',
    visitedAt: '2026-04-02T06:00:00.000Z',
    priceLabel: 'KRW 980M',
    agentName: '이재호',
    isPinned: false,
    summary:
      '계약 전 화물 엘리베이터 접근성과 저녁 시간대 유동 인구를 추가로 확인해야 한다.',
  },
  {
    id: 'visit-log-3',
    title: '연남동 부티크 상가 코너',
    district: '마포구',
    propertyType: 'retail',
    status: 'draft',
    visitedAt: '2026-03-21T04:15:00.000Z',
    priceLabel: 'KRW 730M',
    agentName: '김소라',
    isPinned: false,
    summary:
      '매장 노출도는 좋았다. 주말 유동 인구 수치를 확인하는 2차 점검이 필요하다.',
  },
];

let visitLogsMock = [...initialVisitLogs];

const listVisitLogsMock = () => {
  return [...visitLogsMock];
};

const appendVisitLogMock = (visitLog: VisitLog) => {
  visitLogsMock = [visitLog, ...visitLogsMock];
};

const updateVisitLogMock = (visitLog: VisitLog) => {
  visitLogsMock = visitLogsMock.map((current) =>
    current.id === visitLog.id ? visitLog : current,
  );
};

const resetVisitLogsMock = () => {
  visitLogsMock = [...initialVisitLogs];
};

export {
  appendVisitLogMock,
  listVisitLogsMock,
  resetVisitLogsMock,
  updateVisitLogMock,
};
