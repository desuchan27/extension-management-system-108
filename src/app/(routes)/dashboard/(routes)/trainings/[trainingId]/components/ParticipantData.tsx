"use client"

import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { Participant, Training } from '@prisma/client'
import { Edit, Plus, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import ParticipantForm from './modals/ParticipantForm'

interface ParticipantDataProps {
    participantData: Participant[]
    trainingData: Training | null
}

const ParticipantData: FC<ParticipantDataProps> = ({
    participantData, trainingData
}) => {

    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleParticipantData, setSingleParticipantData] = useState<Participant | null>(null);

    const handleModalOpen = (participant: Participant | null = null) => {
        setSingleParticipantData(participant);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSingleParticipantData(null);
        setIsModalOpen(false);
        // Reload the client page here
        router.refresh();
    };

    return (
        <div className='border-2 rounded px-5 border-[#e5e7eb] h-full overflow-y-auto'>
            <Modal title="New Participant" description="Add a new participant" isOpen={isModalOpen} onClose={handleModalClose}>
                <ParticipantForm onSuccess={handleModalClose} trainingData={trainingData} participantData={singleParticipantData} />
            </Modal>
            <div className='flex mb-4 pt-5 align-center justify-between'>
                <h1 className='text-lg p-2 font-bold'>Participants</h1>
                <Button
                    onClick={() => handleModalOpen()} // Open modal for a new participant
                    className='text-xs'
                >
                    <Plus className='scale-75 transform' />Add New
                </Button>
            </div>
            <Separator />

            <div className='mt-2'>
                {participantData.length > 0 ? (
                    participantData.map((participant) => (
                        <div
                            key={participant.id}
                            className='mb-1'
                        >
                            <div className='mt-2 grid grid-cols-3'>
                                <h3 className='text-sm font-semibold mb-2'>name</h3>
                                <h3 className='text-sm font-semibold mb-2'>gender</h3>
                                <h3 className='text-sm font-semibold mb-2'>actions</h3>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className='text-sm'>{participant.name}</p>
                                <p className='text-sm'>{participant.gender}</p>
                                <Edit
                                    className='scale-75 transform cursor-pointer'
                                    onClick={() => handleModalOpen(participant)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No participants available</p>
                )}
            </div>
        </div>
    )
}

export default ParticipantData