'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialData = {
  columns: [
    {
      id: 'new',
      title: 'New',
      amount: 69600,
      cards: [
        {
          id: '1',
          title: 'Interest in your Graphic Design Project',
          type: 'Software',
          amount: 24000,
          company: 'Agrolait',
          avatar: '/public/avatars/alex.jpg',
          stars: 2,
        },
        {
          id: '2',
          title: 'Script to Import external data',
          type: 'Services',
          amount: 5600,
          company: 'Camptocamp',
          avatar: '/public/avatars/bob.jpg',
          stars: 1,
        },
        {
          id: '3',
          title: 'Plan to buy 60 keyboards',
          type: 'Product',
          amount: 40000,
          company: 'Agrolait',
          avatar: '/public/avatars/alice.jpg',
          stars: 1,
        },
      ],
    },
    {
      id: 'qualified',
      title: 'Qualified',
      amount: 61000,
      cards: [
        {
          id: '4',
          title: 
            
            "Trainee's training plan in your Organization",
          type: 'Information • Training',
          amount: 35000,
          company: 'Delta PC',
          avatar: '/public/avatars/david.jpg',
          stars: 1,
        },
        {
          id: '5',
          title: 'Pricing Information of Services',
          type: 'Services • Information',
          amount: 1000,
          company: '',
          avatar: '/public/avatars/bob.jpg',
          stars: 1,
        },
        {
          id: '6',
          title: 'Plan to buy RedHat servers',
          type: 'Product',
          amount: 25000,
          company: 'Agrolait',
          avatar: '/public/avatars/sarah.jpg',
          stars: 1,
        },
      ],
    },
    {
      id: 'proposition',
      title: 'Proposition',
      amount: 24500,
      cards: [
        {
          id: '7',
          title: 'Would appreciate more information about your products',
          type: 'Software',
          amount: 11000,
          company: 'Agrolait',
          avatar: '/public/avatars/bob.jpg',
          stars: 2,
        },
        {
          id: '8',
          title: 'Need to customize the solution',
          type: 'Information',
          amount: 4500,
          company: '',
          avatar: '/public/avatars/bob.jpg',
          stars: 1,
        },
        {
          id: '9',
          title: '"Resource Planning" project development',
          type: 'Consulting',
          amount: 9000,
          company: 'Delta PC',
          avatar: '/public/avatars/alice.jpg',
          stars: 2,
        },
      ],
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      amount: 77000,
      cards: [
        {
          id: '10',
          title: 'Interest in your customizable PCs',
          type: 'Product',
          amount: 15000,
          company: 'Camptocamp',
          avatar: '/public/avatars/bob.jpg',
          stars: 2,
        },
        {
          id: '11',
          title: 'Need 20 Days of Consultancy',
          type: 'Consulting',
          amount: 60000,
          company: '',
          avatar: '/public/avatars/sarah.jpg',
          stars: 3,
        },
        {
          id: '12',
          title: 'Want to subscribe to your online solution',
          type: 'Software',
          amount: 2000,
          company: 'Think Big',
          avatar: '/public/avatars/alice.jpg',
          stars: 1,
        },
      ],
    },
    {
      id: 'won',
      title: 'Won',
      amount: 25600,
      cards: [
        {
          id: '13',
          title: 'Interest in your products',
          type: 'Software',
          amount: 20000,
          company: 'Agrolait',
          avatar: '/public/avatars/alice.jpg',
          stars: 2,
        },
        {
          id: '14',
          title: 'Interest in your Partnership',
          type: 'Consultation • Other',
          amount: 19800,
          company: 'China Export',
          avatar: '/public/avatars/sarah.jpg',
          stars: 1,
        },
        {
          id: '15',
          title: 'Need new design for my website',
          type: 'Design',
          amount: 3800,
          company: 'Delta PC',
          avatar: '/public/avatars/david.jpg',
          stars: 1,
        },
      ],
    },
  ],
};

function getColumnColor(idx: number) {
  const colors = [
    'bg-green-200',
    'bg-yellow-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
  ];
  return colors[idx % colors.length];
}

const defaultDeal = {
  title: '',
  type: '',
  amount: 0,
  company: '',
  avatar: '/avatars/alex.jpg',
  stars: 1,
};

export default function SalesPipeline() {
  const [data, setData] = useState(initialData);
  const [dealId, setDealId] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState(defaultDeal);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColIdx = data.columns.findIndex((col) => col.id === source.droppableId);
    const destColIdx = data.columns.findIndex((col) => col.id === destination.droppableId);
    const sourceCol = data.columns[sourceColIdx];
    const destCol = data.columns[destColIdx];
    const sourceCards = Array.from(sourceCol.cards);
    const [removed] = sourceCards.splice(source.index, 1);
    if (sourceCol === destCol) {
      sourceCards.splice(destination.index, 0, removed);
      const newColumns = [...data.columns];
      newColumns[sourceColIdx] = { ...sourceCol, cards: sourceCards };
      setData({ columns: newColumns });
    } else {
      const destCards = Array.from(destCol.cards);
      destCards.splice(destination.index, 0, removed);
      const newColumns = [...data.columns];
      newColumns[sourceColIdx] = { ...sourceCol, cards: sourceCards };
      newColumns[destColIdx] = { ...destCol, cards: destCards };
      setData({ columns: newColumns });
    }
  };

  const handleAddDeal = () => {
    setNewDeal(defaultDeal);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDeal((prev) => ({ ...prev, [name]: name === 'amount' || name === 'stars' ? Number(value) : value }));
  };

  const handleDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDealObj = {
      ...newDeal,
      id: String(dealId),
    };
    setDealId((id) => id + 1);
    setData((prev) => {
      const newColumns = prev.columns.map((col) =>
        col.id === 'new'
          ? { ...col, cards: [newDealObj, ...col.cards] }
          : col
      );
      return { columns: newColumns };
    });
    setShowModal(false);
  };

  return (
    <div className="p-2 md:p-6 overflow-x-auto">
      <div className="mb-4 flex items-center">
        <button
          onClick={handleAddDeal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={handleModalClose}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">Add New Deal</h2>
            <form onSubmit={handleDealSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input name="title" value={newDeal.title} onChange={handleDealChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Input name="type" value={newDeal.type} onChange={handleDealChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input name="amount" type="number" value={newDeal.amount} onChange={handleDealChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input name="company" value={newDeal.company} onChange={handleDealChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stars</label>
                <Input name="stars" type="number" min={1} max={3} value={newDeal.stars} onChange={handleDealChange} required />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Add Deal</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 min-w-[900px] w-full">
          {data.columns.map((col, colIdx) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 min-w-[260px] max-w-xs bg-white rounded-lg shadow-md border border-gray-200 flex flex-col ${getColumnColor(colIdx)} transition-colors`}
                >
                  <div className="p-3 border-b border-gray-300 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{col.title}</span>
                      <span className="text-xs font-bold text-gray-500">${col.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${Math.min(100, col.amount / 1000)}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 p-2 space-y-3 overflow-y-auto">
                    {col.cards.map((card, idx) => (
                      <Draggable draggableId={card.id} index={idx} key={card.id}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 p-3 transition-all cursor-pointer ${snapshot.isDragging ? 'ring-2 ring-primary' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">{card.title}</span>
                              <Avatar className="w-7 h-7 ml-2">
                                <AvatarImage src={card.avatar.replace('/public', '')} alt="avatar" />
                                <AvatarFallback>{card.company ? card.company[0] : 'A'}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <span>{card.type}</span>
                              {card.company && <span className="text-gray-400">• {card.company}</span>}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-green-700 text-sm">${card.amount.toLocaleString()}</span>
                              <div className="flex items-center gap-0.5">
                                {[1,2,3].map((n) => (
                                  <Star key={n} className={`w-4 h-4 ${n <= card.stars ? 'text-yellow-400 fill-yellow-300' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}