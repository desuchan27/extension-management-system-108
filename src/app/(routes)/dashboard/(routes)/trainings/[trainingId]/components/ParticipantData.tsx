"use client"

import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { Participant, Training } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import ParticipantForm from './forms/ParticipantForm'

interface ParticipantDataProps {
    participantData: Participant[]
    trainingData: Training | null
}

const ParticipantData: FC<ParticipantDataProps> = ({
    participantData, trainingData
}) => {

    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Reload the client page here
        router.refresh();
    };

    return (
        <div className='border-2 rounded px-5 border-[#e5e7eb] h-full'>
            <Modal title="New Participant" description="Add a new participant" isOpen={isModalOpen} onClose={handleModalClose}>
                <ParticipantForm onSuccess={handleModalClose} trainingData={trainingData} />
            </Modal>
            <div className='flex mb-4 pt-5 align-center justify-between'>
                <h1 className='text-xl p-2 font-bold'>Participants</h1>
                <Button onClick={handleModalOpen}>
                    <PlusIcon />Add New
                </Button>
            </div>
            <Separator />
            <div className='mt-4'>
                {participantData.length > 0 ? (
                    participantData.map((participant) => (
                        <div key={participant.id}>
                            <h3>{participant.name}</h3>
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