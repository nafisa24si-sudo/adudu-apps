import { Link } from 'react-router-dom';

export default function PageHeader({ title, breadcrumb, children }) {
    const renderBreadcrumb = () => {
        if (Array.isArray(breadcrumb) && breadcrumb.length > 0) {
            return (
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {breadcrumb.map((item, index) => (
                        <span key={index} className="flex items-center">
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="text-gray-500">{item.name}</span>
                            )}
                            {index < breadcrumb.length - 1 && (
                                <span className="text-gray-500 mx-1">/</span>
                            )}
                        </span>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold">
                    {title}
                </span>
                {renderBreadcrumb()}
            </div>
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}