import { useEffect, useState } from 'react';
import { fetchEmployees, type EmployeeDto } from '../api/employees';
import { useAppSelector } from '../app/hooks';
import toast from 'react-hot-toast';
import { employeeApi } from '../api/employeeApi';

const EmployeeManagementPage = () => {
    const token = useAppSelector(s => s.auth.token)!;   // guaranteed by RequireRole
    const [employees, setEmployees] = useState<EmployeeDto[]>([]);
    const [loading, setLoading] = useState(true);

    //     curl -i \
    //   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInJvbGVzIjpbIkN1c3RvbWVyIiwiU3RvcmUgTWFuYWdlciJdLCJpYXQiOjE3NTAwMzc4MjcsImV4cCI6MTc1MDY0MjYyN30.e5vnjG44ij-h9VPKET9OoBrjjnSBgDGRkF1aOMzHgQs" \
    //   -H "Accept: application/json" \
    //   http://localhost:4000/api/employees



    useEffect(() => {
        (async () => {
            try {
                const emps = await fetchEmployees();   // no token arg needed
                setEmployees(emps);
            } catch {
                toast.error('Failed to load employees');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const clockIn = async () => {
        await employeeApi.clockIn();
        toast.success('Clocked in!');
    };

    const clockOut = async () => {
        await employeeApi.clockOut();
        toast.success('Clocked out!');
    };

    const showHours = async () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();            // 0-based (0 = Jan)

        // last day of current month → Date(year, nextMonth, 0)
        const lastDay = new Date(year, month + 1, 0).getDate();   // 28..31

        const from = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const to = `${year}-${String(month + 1).padStart(2, '0')}-${lastDay}`;

        const userId =
            JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).id;

        try {
            console.log(`Fetching hours for user ${userId} from ${from} to ${to}`);
            const { hours } = await employeeApi.hours(userId, from, to);
    console.log('raw response →', { hours, type: typeof hours });
    const pretty = Number(hours).toFixed(2);
            alert(`Total hours this month: ${pretty}`);
        } catch {
            toast.error('Could not fetch hours');
        }
    };

    if (loading) return <p>Loading…</p>;

    return (
        <div className="container">
            <h1>Employees</h1>
            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(e => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.email}</td>
                                <td>{e.roles.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* ───── temporary test buttons ───── */}
            <div className="flex gap-4">
                <button onClick={clockIn} className="px-4 py-2 bg-green-600 text-white rounded">Clock In</button>
                <button onClick={clockOut} className="px-4 py-2 bg-red-600   text-white rounded">Clock Out</button>
                <button onClick={showHours} className="px-4 py-2 bg-blue-600  text-white rounded">My Hours (this month)</button>
            </div>
        </div>
    );
};

export default EmployeeManagementPage;
