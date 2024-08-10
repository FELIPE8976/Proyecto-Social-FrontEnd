import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogHeader } from "@/components/ui/dialog"; 
import { formatCurrency } from "@/helpers";


type FamilyMemberModalProps = {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    name: string;
    age: number;
    relationship: string;
    education: string;
    occupation: string;
    income: number;
    document_type: string;
    document_number: string;
}

const FamilyMemberModal = ({ modalOpen, setModalOpen, name, age, relationship, education, occupation, income , document_type, document_number} : FamilyMemberModalProps) => {
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="rounded-xl bg-white p-6">
                <DialogClose asChild>
                </DialogClose>
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-3xl text-[#C5CD3C] font-secondary font-bold">{name}</DialogTitle>
                </DialogHeader>
                <div className="flex">
                    <DialogDescription className="flex-grow grid gap-2">
                        <p className="font-primary">Edad: {age}</p>
                        <p className="font-primary">Parentesco: {relationship}</p>
                        <p className="font-primary">{document_type}: {document_number}</p>
                        <p className="font-primary">Escolaridad: {education}</p>
                        <p className="font-primary">Ocupación: {occupation}</p>
                        <p className="font-primary">Ingresos al Mes: {formatCurrency(income)}</p>
                    </DialogDescription>
                </div>
                <button onClick={() => setModalOpen(false)} className="mt-4 font-primary text-lg text-[#C5CD3C] font-semibold text-left">
                    {'<'} Volver
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default FamilyMemberModal