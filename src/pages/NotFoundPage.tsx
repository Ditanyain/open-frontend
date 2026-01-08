import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import NotFoundImage from "@/assets/images/404-error.png";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <img
              src={NotFoundImage}
              alt="Not found"
              className="opacity-50 w-full h-auto max-w-62"
            />
          </EmptyMedia>

          <EmptyTitle>Opps! Halaman Tidak Ditemukan</EmptyTitle>

          <EmptyDescription>
            Halaman yang kamu cari tidak ditemukan atau sudah tidak tersedia.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default NotFoundPage;
